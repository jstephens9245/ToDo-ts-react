import React, { useState, useEffect, useContext, useCallback }  from "react";
import { useDispatch, useGlobalState } from "../NewServiceRequest"
import "../NewServiceRequest.scss"
// import { states } from "../../../utilities/utilities"
import { Action, initialState, reducer, State } from "../NewServiceRequestContext";

// import { Cipher } from "crypto";
import moment from "moment";

interface undergroundFacilitiesT {
  'City Water / Sewer / Geothermal': boolean,
  'Sprinkler System': boolean,
  'Septic Field / Well': boolean,
  'Private Underground Wiring': boolean,
  'Underground Fence': boolean,
  other: boolean;
  otherDetails: string;
  [key: string]: string|boolean;
}

const ReviewNSubmit: React.FunctionComponent = (): React.ReactElement => {
    const dispatch = useDispatch();

    const PI = useGlobalState('projectInformation');
    const SI = useGlobalState('serviceInformation');
    const siteDetails = useGlobalState('siteDetails');
    const SD = useGlobalState('serviceDetails');
    const DD = useGlobalState('developmentDetails');

    const workOrderInitiator = useGlobalState('workOrderInitiator');
    const owner = useGlobalState('owner');
    const primary = useGlobalState('primary');
    const billingContact = useGlobalState('billingContact');
    const billingAddress = useGlobalState('billingAddress');

    const undergroundFacilities: undergroundFacilitiesT = SD.gasServiceDetails.undergroundFacilities;
    // console.log("state",initialState)

    const setContactInfo = useCallback((selectType, identifier, data) => dispatch({ type: selectType, [identifier]: data }), [dispatch]);
    const setJobtype = useCallback((data) => dispatch({ type: 'setJobType', jobType: data }), [dispatch]);

    const readUndergroundFacilities = () => {
      Object.keys(undergroundFacilities).map((key: string, i) => {
        if(undergroundFacilities[key] && i === 0) {
          if(key === "otherDetails") {
            return (
              <div>
                <div className="flex-item title underground-facility">Underground Facilities:</div><span className="text" id={key}>{undergroundFacilities[key]}</span>
              </div>)
          }
          else {
            return (<div>
                      <div className="flex-item title underground-facility">Underground Facilities:</div><span className="text" id={key}>{key}</span><br />
                    </div>)
          }
        } else if(undergroundFacilities[key]) {
          if(key === "otherDetails") {
            return (<div>
                      <div className="flex-item title"></div><span className="text" id={key}>{undergroundFacilities[key]}</span><br />
                    </div>)
          }

          else {
            return (<div>
                      <div className="flex-item title"></div><span className="text" id={key}>{key}</span><br />
                    </div>)
          }
        }
      })
    }

    return (
      <>
        <h2 className="sectional-information-title">Review & Submit</h2>
        <p>Please Review your application and confirm all information is correct.</p>
        <hr />
        <h4 className="h4-title-format">Project Information</h4>
        <a className="edit-btn" >Edit</a>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Job Type:</div><span className="text">{PI.jobType}</span>
          </div>
          <div>
            <div className="flex-item title">Site Ready Date:</div>
            <span className="text">{PI.jobSiteReady.length ? moment(PI.jobSiteReady).format('ddd. MMM Do, YYYY'): null}</span>
          </div>
          <div>
            <div className="flex-item title">Development Type:</div><span className="text">{PI.developmentType}</span>
          </div>
        </div>

        <h5>Development Details</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Home Type:</div><span className="text">{DD.homeType}</span>
          </div>
          <div>
            <div className="flex-item title">Development Name:</div><span className="text">{DD.developmentName}</span>
          </div>
          <div>
            <div className="flex-item title">Location:</div><span className="text">{DD.city}, {DD.zipCode}</span>
            {/* ^ this has issues, the zeplin calls for a state, but DD never determines a state */}
          </div>
          <div>
            <div className="flex-item title">Cross-Streets:</div><span className="text">{DD.crossStreets}</span>
          </div>
        </div>

        <h5>Site Details</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Site Address:</div>
              <span className="text">{siteDetails.streetNumber} {siteDetails.streetName} {siteDetails.unitNumber} {siteDetails.lotNumber}</span>
          </div>
        </div>
        <hr />

        <h4 className="h4-title-format">Service Information</h4>
        <a className="edit-btn" >Edit</a>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Service Needed:</div><span className="text">{SI.serviceNeeded}</span>
          </div>
        </div>

        <h5>Electric Service Details</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Service Options:</div><span className="text">{SD.electricServiceDetails.serviceOptions}</span>
          </div>
          <div>
            <div className="flex-item title">Requesting:</div><span className="text">{SD.electricServiceDetails.requestType}</span>
          </div>
          <div>
            <div className="flex-item title">Construction Meter:</div><span className="text">{SD.electricServiceDetails.constructionMeterType}</span>
          </div>
          <div>
            <div className="flex-item title">Amps Required:</div><span className="text">{SD.electricServiceDetails.ampsRequired}</span>
          </div>
          <div>
            <div className="flex-item title">Service Length:</div><span className="text">{SD.electricServiceDetails.serviceLength}</span>
          </div>
          <div>
            <div className="flex-item title">Voltage Class:</div><span className="text">{SD.electricServiceDetails.voltageClass}</span>
          </div>
          <div>
            <div className="flex-item title">Notes:</div><span className="text">{SD.electricServiceDetails.additionalNotes}</span>
          </div>
          <div>
            <div className="flex-item title">Requested Service Date:</div>
            <span className="text">{SD.electricServiceDetails.serviceStartDate.length ? moment(SD.electricServiceDetails.serviceStartDate).format('ddd. MMM Do, YYYY'): null}</span>
          </div>
        </div>

        <h5>Gas Service Details</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Home Square Footage:</div><span className="text">{SD.gasServiceDetails.squareFootage}</span>
          </div>

          {readUndergroundFacilities()}

          <div>
            <div className="flex-item title">Furance/Space Heater:</div><span className="text">{SD.gasServiceDetails.applianceLoad.furnaceSpaceHeaterLoad}</span>
          </div>
          <div>
            <div className="flex-item title">Water Heater:</div><span className="text">{SD.gasServiceDetails.applianceLoad.waterHeaterLoad}</span>
          </div>
          <div>
            <div className="flex-item title">Clothes Dryer:</div><span className="text">{SD.gasServiceDetails.applianceLoad.clothesDryerLoad}</span>
          </div>
          <div>
            <div className="flex-item title">Stove/Oven:</div><span className="text">{SD.gasServiceDetails.applianceLoad.stoveOvenLoad}</span>
          </div>
          <div>
            <div className="flex-item title">Desired Meter Size:</div><span className="text">{SD.gasServiceDetails.meterSize}</span>
          </div>
          <div>
            <div className="flex-item title">Notes:</div><span className="text">{SD.gasServiceDetails.additionalNotes}</span>
          </div>
          <div>
            <div className="flex-item title">Requested Service Date:</div>
            <span className="text">{SD.gasServiceDetails.serviceStartDate.length ? moment(SD.gasServiceDetails.serviceStartDate).format('ddd. MMM Do, YYYY'): null}</span>
          </div>
        </div>
        <hr />

        <h4 className="h4-title-format">Contact Information</h4>
        <a className="edit-btn" >Edit</a>
        <h5>Work Order Initiator</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Name:</div><span className="text">{workOrderInitiator.firstName} {workOrderInitiator.lastName}</span>
          </div>
          <div>
            <div className="flex-item title">Email:</div><span className="text">{workOrderInitiator.emailAddress}</span>
          </div>
          <div>
            <div className="flex-item title">Company:</div><span className="text">{workOrderInitiator.company}</span>
          </div>
          <div>
            <div className="flex-item title">Position:</div><span className="text">{workOrderInitiator.position}</span>
          </div>
          <div>
            <div className="flex-item title">Phone:</div><span className="text">{workOrderInitiator.phoneNumber}</span>
          </div>
        </div>

        <h5>Property Owner</h5>
        <div className="row-flexed">
        <div>
            <div className="flex-item title">Name:</div><span className="text">{owner.firstName} {owner.lastName}</span>
          </div>
          <div>
            <div className="flex-item title">Email:</div><span className="text">{owner.emailAddress}</span>
          </div>
          <div>
            <div className="flex-item title">Company:</div><span className="text">{workOrderInitiator.company}</span>
          </div>
          <div>
            <div className="flex-item title">Position:</div><span className="text">{workOrderInitiator.position}</span>
          </div>
          <div>
            <div className="flex-item title">Phone:</div><span className="text">{owner.phoneNumber}</span>
          </div>
        </div>

        <h5>Primary Site Contact</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Name:</div><span className="text">{primary.firstName} {primary.lastName}</span>
          </div>
          <div>
            <div className="flex-item title">Email:</div><span className="text">{primary.emailAddress}</span>
          </div>
          <div>
            <div className="flex-item title">Company:</div><span className="text">{workOrderInitiator.company}</span>
          </div>
          <div>
            <div className="flex-item title">Position:</div><span className="text">{workOrderInitiator.position}</span>
          </div>
          <div>
            <div className="flex-item title">Phone:</div><span className="text">{primary.phoneNumber}</span>
          </div>
        </div>

        <h5>Billing Contact</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Name:</div><span className="text">{billingContact.firstName} {billingContact.lastName}</span>
          </div>
          <div>
            <div className="flex-item title">Email:</div><span className="text">{billingContact.emailAddress}</span>
          </div>
          <div>
            <div className="flex-item title">Company:</div><span className="text">{workOrderInitiator.company}</span>
          </div>
          <div>
            <div className="flex-item title">Position:</div><span className="text">{workOrderInitiator.position}</span>
          </div>
          <div>
            <div className="flex-item title">Phone:</div><span className="text">{billingContact.phoneNumber}</span>
          </div>
        </div>

        <h5>Billing Contact</h5>
        <div className="row-flexed">
          <div>
            <div className="flex-item title">Address:</div><span className="text">{billingAddress.streetName} {billingAddress.aptUnitNumber}</span>
          </div>
          <div>
            <div className="flex-item title"></div><span className="text">{billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}</span>
          </div>
        </div>

        <hr className="last" />
      </>
  );
};
export default ReviewNSubmit;
