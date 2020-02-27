import React, { useCallback } from "react";
import { useDispatch, useGlobalState } from "../../NewServiceRequest"

interface Props {
  developmentType : string,
  jobType         : string
}

const DevelopmentDetails: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  const {developmentType, jobType} = props
  const dispatch = useDispatch();

  const { homeType, developmentName, city, zipCode, crossStreets } = useGlobalState('developmentDetails');
  const setDevelopmentName = useCallback((data) => dispatch({ type: 'setDevelopmentName', developmentName: data }), [dispatch]);
  const setHomeType = useCallback((data) => dispatch({ type: 'setHomeType', homeType: data }), [dispatch]);
  const setCity = useCallback((data) => dispatch({ type: 'setCity', city: data }), [dispatch]);
  const setZip = useCallback((data) => dispatch({ type: 'setZip', zipCode: data }), [dispatch]);
  const setCrossStreets = useCallback((data) => dispatch({ type: 'setCrossStreets', crossStreets: data }), [dispatch]);

  return (
    <div className="development-details form-field">
      <h5>Development Details</h5>
      <form>
      {developmentType === "Residential" ?
      <>
        <p>Home Type*</p>

        { homeType.length ?
          <div className="select-wrapper">
            <select className="activated"
            onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}}
            onClick={(e: any) => { setHomeType(e.target.value)}}
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
          <div className="select-wrapper">
            <select onMouseEnter={(e) => { e.currentTarget.classList.add("activated")}}
            onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}}
            onClick={(e: any) => { setHomeType(e.target.value)}}
            >
              <option value="" disabled selected>Select</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        }

        <p>Development Name</p>
        <input placeholder="Subdivision or Development" value={developmentName} onChange={(e) => { setDevelopmentName(e.target.value)}} />
      </>
      :
      <>
        <p>{developmentType} Description</p>
        <input className="commercial-extended-input" placeholder={`${developmentType} Description`} />

        <p>{developmentType} Name</p>
        <input placeholder={`${developmentType} Name`} />
      </>
      }

      { jobType === "New Subdivision" || jobType === "Existing Building" ? null :
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
        <hr />
      </>
      }
      </form>
    </div>
  );
};

export default DevelopmentDetails;