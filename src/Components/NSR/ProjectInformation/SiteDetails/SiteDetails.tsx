import React, { useCallback } from "react";
import { useDispatch, useGlobalState } from "../../NewServiceRequest"

interface Props {
  developmentType : string,
  jobType         : string,
}

const SiteDetails: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  const {developmentType, jobType} = props
  const dispatch = useDispatch();

  const { streetNumber, streetName, unitNumber, lotNumber, numberOfUnits } = useGlobalState('siteDetails');
  const setStreetNumber = useCallback((data) => dispatch({ type: 'setStreetNumber', streetNumber: data }), [dispatch]);
  const setStreetName = useCallback((data) => dispatch({ type: 'setStreetName', streetName: data }), [dispatch]);
  const setUnitNumber = useCallback((data) => dispatch({ type: 'setUnitNumber', unitNumber: data }), [dispatch]);
  const setLotNumber = useCallback((data) => dispatch({ type: 'setLotNumber', lotNumber: data }), [dispatch]);
  const setNumberOfUnits = useCallback((data) => dispatch({ type: 'setNumberOfUnits', numberOfUnits: data }), [dispatch]);


  const { city, zipCode, crossStreets } = useGlobalState('developmentDetails');
  const setCity = useCallback((data) => dispatch({ type: 'setCity', city: data }), [dispatch]);
  const setZip = useCallback((data) => dispatch({ type: 'setZip', zipCode: data }), [dispatch]);
  const setCrossStreets = useCallback((data) => dispatch({ type: 'setCrossStreets', crossStreets: data }), [dispatch]);



  return (
    <>
      <form>
      { (jobType === "New Construction" || jobType === "Existing Building") &&
        <>
          <div className="input-inline-block">
            <p>Street Number*</p>
            <input placeholder="Number" value={streetNumber} onChange={(e) => { setStreetNumber(e.target.value) }} />
          </div>
          <div className="input-inline-block">
            <p>Street Name*</p>
            <input placeholder="Name" value={streetName} onChange={(e) => { setStreetName(e.target.value) }} />
          </div>
        </>
      }

      { jobType !== "New Subdivision" &&
        <>
          <p>Unit Number</p>
          <input placeholder={`${developmentType === "Residential" ? "Apartment" : "Suite"} or Unit Number`}
          value={unitNumber} onChange={(e) => { setUnitNumber(e.target.value) }} />
        </>
      }

      { (jobType === "New Subdivision" || jobType === "Existing Building") &&
        <>
          <div className="input-inline-block">
            <p>City*</p>
            <input placeholder="City, Township, or Village" value={city} onChange={(e) => { setCity(e.target.value)}} />
          </div>
          <div className="input-inline-block">
            <p>Zip Code*</p>
            <input placeholder="12345" value={zipCode} onChange={(e) => { setZip(e.target.value)}}  />
          </div>
          <p>Cross-Streets*</p>
          <input className="commercial-extended-input" placeholder="Between Example and Example" value={crossStreets} onChange={(e) => { setCrossStreets(e.target.value) }} />
        </>
      }

      { (jobType === "New Construction" || jobType === "") &&
        <>
          <p>Lot Number</p>
          <input placeholder="Lot Number" value={lotNumber} onChange={(e) => { setLotNumber(e.target.value) }} />
        </>
      }

      { jobType === "New Subdivision" &&
        <>
          <p>Number of Units*</p>
          <input placeholder="Number" value={numberOfUnits ? numberOfUnits : ""} onChange={(e) => { setNumberOfUnits(e.target.value) }} />
        </>
      }




      </form>
      <hr className="last" />
    </>
  );
};

export default SiteDetails;