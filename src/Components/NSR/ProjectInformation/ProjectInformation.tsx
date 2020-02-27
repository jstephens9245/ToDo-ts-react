import React, { useState, useCallback, useLayoutEffect }  from "react";
import DevelopmentDetails from "./DevelopmentDetails/DevelopmentDetails";
import SiteDetails from "./SiteDetails/SiteDetails";
import { useDispatch, useGlobalState, someValidatorFunction } from "../NewServiceRequest"
import Calendar from '../../Widgets/Calendar';
import "../NewServiceRequest.scss"

// const {dates} = require("../../../mockAppts.json");

const ProjectInformation: React.FunctionComponent = (): React.ReactElement => {
  const [additionalSites, setAdditionalSites] = useState([]);
  const dispatch = useDispatch();

  const { developmentType, jobType, jobSiteReady } = useGlobalState('projectInformation');

  const setDevelopmentType = useCallback((data) => dispatch({ type: 'setDevelopmentType', developmentType: data }), [dispatch]);
  const setJobtype = useCallback((data) => dispatch({ type: 'setJobType', jobType: data }), [dispatch]);
  const setJobSiteReady = useCallback((data) => dispatch({ type: "setJobSiteReady", jobSiteReady: data}), [dispatch]);

  const setCanSubmit = useCallback((data) => dispatch({ type: 'setCanSubmit', canSubmit: data }), [dispatch]);


  const developmentDetails = (
    <DevelopmentDetails developmentType={developmentType} jobType={jobType} />
  )

  const siteDetails = (
    <SiteDetails developmentType={developmentType} jobType={jobType} />
  )

  const SiteD = useGlobalState('siteDetails');
  const DD = useGlobalState('developmentDetails');

  const validateDD: Array<any> = [ DD.homeType, DD.crossStreets, DD.city, DD.zipCode ];
  const validateDDComercial: Array<any> = [ DD.crossStreets, DD.city, DD.zipCode ];
  const validateSiteD: Array<any> = [  SiteD.streetNumber, SiteD.streetName ];

  const whichJobType = () => {
    switch(jobType) {
      case "New Construction":
        if(developmentType === "Residential") {
          return [...validateDD, ...validateSiteD ]
        } else if(developmentType === "Commercial") {
          return [...validateSiteD, ...validateDDComercial ]
        }
      case "New Subdivision":
        if(developmentType === "Residential") {
          return [...validateDD, SiteD.numberOfUnits ]
        } else if(developmentType === "Commercial") {
          return [...validateDDComercial, SiteD.numberOfUnits ]
        }
      case "Existing Building":
        if(developmentType === "Residential") {
          return [...validateSiteD, ...validateDD ]
        } else if(developmentType === "Commercial") {
          return [...validateSiteD, ...validateDDComercial ]
        }
      default:
        return []
    }
  }

  useLayoutEffect(() => {
    if(developmentType.length && jobType.length) {
      if(!whichJobType().some(someValidatorFunction)) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }
  }, [developmentType, jobType, ...validateDD, ...validateSiteD, SiteD.numberOfUnits])

    return (
      <form>
        <h2 className="sectional-information-title">Project Information</h2>
        <p className="margin-bot-20">
          Tell us about your construction project and the property at which you would like new service installed.
        </p>
        <p>
          Select Job Type:
        </p>
        <label className="container">New Constuction
          <input onClick={() => {setJobtype("New Construction")}} type="radio" name="radio" value="New Constuction"
          checked={ jobType === "New Construction" ? true : false}/>
          <span className="checkmark"></span>
        </label>
        <label className="container">Existing Building
          <input onClick={() => {setJobtype("Existing Building")}} type="radio" name="radio" value="Existing Building"
          checked={ jobType === "Existing Building" ? true : false}/>
          <span className="checkmark"></span>
        </label>
        <label className="container">New Subdivision
          <input onClick={() => {setJobtype("New Subdivision")}} type="radio" name="radio" value="New Subdivision"
          checked={ jobType === "New Subdivision" ? true : false}/>
          <span className="checkmark"></span>
        </label>
        <p>Development type</p>
        { developmentType.length ?
          <div className="select-wrapper margin-bot-20">
            <select onMouseEnter={(e) => { e.currentTarget.classList.add("activated")}}
            onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}}
            onClick={(e: any) => { setDevelopmentType(e.target.value)}}
            >
            <option value="" disabled>Select</option>
            { developmentType === "Residential" ?
              <>
                <option value="Residential" selected>Residential</option>
                <option value="Commercial">Commercial</option>
              </>
            :
              <>
                <option value="Residential">Residential</option>
                <option value="Commercial" selected>Commercial</option>
              </>
            }
            </select>
          </div>
          :
          <div className="select-wrapper margin-bot-20">
            <select onMouseEnter={(e) => { e.currentTarget.classList.add("activated")}}
            onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}}
            onClick={(e: any) => { setDevelopmentType(e.target.value)}}
            >
              <option value="" disabled selected>Select</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        }
        <p>When will the job site be ready for service installation?</p>
        <Calendar
            inputCalendar = {true}
            inputDataState = { { data: jobSiteReady, setData: setJobSiteReady } }
            className = "project-info-calendar"
        />
        <hr className="last" />

        {/* Development Details */}
        {developmentType && developmentDetails}

        {/* Site Details */}
        {developmentType &&
          <div className="development-details form-field">
          { jobType === "New Subdivision" || jobType === "Existing Building" ? null :
            <h5>Site Details</h5>
          }
          {siteDetails}
          </div>
        }
        {/* Additional Site Details */}
        {developmentType === "Residential" && jobType === "New Construction" ? (
          additionalSites.length >= 1 ?
          <>
            <div className="development-details form-field">
                <h5 className="additional-site">Additional Site Details</h5>
                {additionalSites.map((elem, i) =>
                <><a
                className="remove-btn"
                onClick={(e) => {
                  e.preventDefault();
                  let array: any = [...additionalSites];
                  if(array.length > 1) {
                    array.splice(i, 1)
                    setAdditionalSites(array);
                        } else {
                          setAdditionalSites(array.pop());
                        }
                      }}>Remove</a>{elem}</> || null)}
            </div>
            <div className="development-details form-field">
              <p className="margin-bot-20">
              Would you like to request service at multiple sites within the same development?<br/>
              This will create multiple identical work orders.
              </p>
              <a onClick={() => {
                let array: any = additionalSites.length ? [...additionalSites, siteDetails] : [siteDetails]
                setAdditionalSites(array)
              }}>+ Additional Site</a>
            </div>
            <hr className="last" />
          </>
          :
          <>
            <div className="development-details form-field">
              <p className="margin-bot-20">
              Would you like to request service at multiple sites within the same development?<br/>
              This will create multiple identical work orders.
              </p>
              <a onClick={() => {
                let array: any = additionalSites.length ? [...additionalSites, siteDetails] : [siteDetails]
                setAdditionalSites(array)
              }}>+ Additional Site</a>
            </div>
            <hr className="last" />
          </>
        ): null}
      </form>
  );
};
export default ProjectInformation;
