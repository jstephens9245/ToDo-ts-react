import moment from "moment";
import React from "react"
import JsonFind from "json-find";
import {cacheHandler} from "./cacheUtils";

const isNotGuestSearch = ():boolean => {
  return !window.location.pathname.includes('guest-search')
}

export const safelyDisplayMMDDYY = (d: string) => {
  let parts = d.split('/')
  if (parts.length === 3 && parts[2] === '19') {
    parts[2] = '2019'
    d = parts.join('/')
  }
  return moment(d).format("MMM DD, YYYY")
}

export const taskIsShowable = (step: any) => {
  if (step.step_status === "Not Required") {
    return false
  }
  if (step.step_status === "Cancelled") {
    return false
  }
  return true
}

const getSODetailsFromWON = (won:string="") => {
  const WOmap = JSON.parse(cacheHandler.get('WOmap') || "[]")
  const relevant = WOmap.filter((item: any) => item.won === won)[0]
  const storedProjects = JSON.parse(cacheHandler.get('projectsList') || "[]");
  const relevantProject = storedProjects.filter((sp:any) => sp.premiseID === relevant.premiseID)[0]

  const relevantSummaryData = relevantProject.summaryData.filter((sd:any) => sd.projectID === relevant.so)[0]
  relevantSummaryData.meterInstallation = relevantProject.summaryData.filter((sd:any) => {
    if (sd.hasOwnProperty('meterInstallation')) { return sd }
  })[0] || {}
  relevantSummaryData.meterInstallationData = relevantProject.summaryData.filter((sd:any) => {
    return sd.serviceType === "Gas" && (!sd.gateCode || sd.gateCode === 'G_8')
  }) || {}
  relevantSummaryData.projectAddress = relevantProject.projectAddress || ""
  relevantSummaryData.premiseID = relevantProject.premiseID
  return relevantSummaryData
}

const getActiveProject = (data: any) => {
  let storedProjects = cacheHandler.get('projectsList') || "[]";
  let activeProjectMeta: any = null
  activeProjectMeta = JSON.parse(storedProjects).map((sp: any) => {
    if (sp.workOrdersString.includes(data.PWO)) {
      return sp;
    }
  })
  // console.log(activeProjectMeta[0].summaryData[0].jobType)
  let activeProject = activeProjectMeta.filter((ap:any) => ap)[0] || [];
  return [activeProject, activeProjectMeta];
}

const convertSentenceToIdentifier = (input: string): string => {
  return input.replace(" ", "-").toLowerCase();
};

const getStepAfterLastCompleted = (steps: any): any => {
  let completeds = steps.map((step:any) => step.step_status === "Completed" ? step.display_order : 0)
  let latestCompleted = Math.max.apply(Math, completeds)
  return latestCompleted + 1
}

const getInProgressStep = (steps: any): number => {
  // Set the inProgressStepNum to the first step with a status of "In Progress"
  const inProgressStepNum = steps
    .map((step: { step_status: any }): number => step.step_status)
    .indexOf("In Progress");

  let latestCompleted = getStepAfterLastCompleted(steps)
  let returnable = inProgressStepNum >= 0 ? inProgressStepNum + 1 : 1;
  if (returnable == 1) {
    returnable = latestCompleted >= 0 ? latestCompleted : 1;
  }
  if (returnable > 8) {
    returnable = 8
  }
  return returnable //inProgressStepNum >= 0 ? inProgressStepNum + 1 : 1;
};

const getFormattedDateTime = (date: string | number) => {
  const dateTime = moment(date).local();
  const meridiem = dateTime.format("a") === "am" ? "a.m." : "p.m.";
  const time = `${dateTime.format("h:mm")}`;
  const apStyle = time.endsWith(":00") ? time.substring(0, time.length - 3) : time
  let day = null;

  if (moment().isSame(dateTime, "day")) {
    day = "Today,";
  } else if (
    moment()
      .subtract(1, "days")
      .isSame(dateTime, "day")
  ) {
    day = "Yesterday,";
  } else {
    day = `${dateTime.format("MMM. D, YYYY")}`;
  }

  return `${day} ${apStyle} ${meridiem}`;
};

// This function uses the JSONFind package to deeply search an object for all occurences of a given key
// This was created to make up for a limitation in JSONFind - it only ever returns one result,
// even if the key appears multiple times
const JSONFindAll = (object: unknown, keys: string[]): string[] => {
  const results: string[] = [];
  let data = object;

  // While JsonFind can find this key in the data, we get this key's value and add it to our result set
  // We then replace this key with "__processed" so it won't match again, and we keep searching until we no longer find instances of the key
  keys.forEach(key => {
    if(key !== "DEFAULT") {
      while (JsonFind(data).checkKey(key)) {
        const result = JsonFind(data).findValues(key);
        results.push(result[key]);

        const resultString = JSON.stringify(result);
        const dataStart = resultString.indexOf('"');
        const dataEnd = resultString.lastIndexOf('"');

        const resultsTrimmed = resultString.slice(dataStart, dataEnd);

        const resultsProcessed = resultsTrimmed.replace(key, "__processed");

        const newResults = JSON.stringify(data).replace(
          resultsTrimmed,
          resultsProcessed
        );

        data = JSON.parse(newResults);
      }
    }
  });

  return results;
};

const titleCase = (str: string) => {
  const newString = str.toLowerCase().split(' ');
  for (let i = 0; i < newString.length; i++) {
    newString[i] = newString[i].charAt(0).toUpperCase() + newString[i].slice(1);
  }
  return newString.join(' ');
};

const formatAddress = (address: string) => {
  if (!address) {
    return ""
  }
  const parser    = require('parse-address');
  const parsed    = parser.parseLocation(address);
  const segment   = `${parsed.number} ${parsed.prefix || ''} ${parsed.street}${parsed.type ? ` ${parsed.type}`: ``}, ${parsed.city}`;
  const formatted = `${titleCase(segment)}, ${parsed.state ? parsed.state.toUpperCase() : ""} ${parsed.zip}${parsed.plus4 ? `-${parsed.plus4}`: ``}`;
  if (formatted.includes('ndefined')) {
    return address
  }
  return formatted;
};

const formatAddressWithBreak = (address: string) => {
  const parser    = require('parse-address');
  const parsed    = parser.parseLocation(address);
  const street   = `${parsed.number} ${parsed.prefix || ''} ${parsed.street}${parsed.type ? ` ${parsed.type}`: ``}`;
  const cityStateZip = ` ${parsed.city}, ${parsed.state ? parsed.state.toUpperCase() : ""} ${parsed.zip}${parsed.plus4 ? `-${parsed.plus4}`: ``}`;

  const formatted = {
    "street": titleCase(street),
    "cityStateZip":titleCase(cityStateZip)
  }

  return formatted
};

const startsWithVowel = (string: string) => {
  const vowelRegex = '^[aeiouAEIOU].*'
  const found      = string.match(vowelRegex) ? true : false;
  return found;
};

const standardizeStatus = (nonStandardStatus: string) => {
  switch(nonStandardStatus.toLowerCase()){
    case "not started":
    case "not_started":
      return "not_started";
    case "In Progress":
    case "in progress":
    case "in_progress":
      return "in_progress";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    case "On Hold":
    case "on hold":
    case "on_hold":
      return "on_hold";
    case "not required":
    case "not_required":
      return "not_required";
    case "assigned":
      return "assigned";
    case "not assigned":
    case "not_assigned":
      return "not_assigned";
    case "not approved":
    case "not_approved":
      return "not_approved";
    case "invoice ready":
    case "invoice_ready":
      return "invoice_ready";
    case "billable customer":
    case "billable_customer":
      return "billable_customer";
    case "overdue":
      return "overdue";
    case "due today":
    case "due_today":
      return "due_today";
    case "due soon":
    case "due_soon":
      return "due_soon";
    case "in review":
    case "in_review":
      return "in_review";
    case "processing":
      return "processing";
    case "to do":
    case "to_do":
    case "todo":
      return "to_do";
    case "invoice":
      return "invoice"
  };
};

const serviceIdToSlug = (serviceID: any): any => {
  let slug = "";
  switch(serviceID.trim().toLowerCase()){
    case "electric":
    case "2199":
      slug = "electric";
      break;
    case "gas":
    case "2280":
      slug = "gas";
      break;
  };
  return slug;
};

// <input> phone formatter as (###) ###-####
const formatToPhone = (event: any) => {
  const target = event.target;
  const input = target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
  const zip = input.substring(0,3);
  const middle = input.substring(3,6);
  const last = input.substring(6,10);

  if(input.length > 6){target.value = `(${zip}) ${middle}-${last}`;}
  else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
  else if(input.length > 0){target.value = `(${zip}`;}
};

const states = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
};

// Example:
// const serviceOptionsArray = [
//   { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
//   { type: "option", props: { value: "Primary Service", selected: false }, innerHTML: "Primary Service" },
//   { type: "option", props: { value: "Overhead", selected: false }, innerHTML: "Secondary Service - Overhead" },
//   { type: "option", props: { value: "Underground", selected: false }, innerHTML: "Secondary Service - Underground" }
// ]
const iterateSelect = (arr: Array<any>, storedValue: string) => {
  return (arr.map((obj: any) => {
    const { type, props, innerHTML } = obj;
    if(props.value === storedValue) {
      props.selected = true
    }
    const el = React.createElement(type, props, innerHTML);
    return el;
  }))
}

export {
  getActiveProject,
  getSODetailsFromWON,
  isNotGuestSearch,
  convertSentenceToIdentifier,
  getInProgressStep,
  getFormattedDateTime,
  JSONFindAll,
  formatAddress,
  formatAddressWithBreak,
  titleCase,
  startsWithVowel,
  standardizeStatus,
  serviceIdToSlug,
  formatToPhone,
  states,
  iterateSelect
};
