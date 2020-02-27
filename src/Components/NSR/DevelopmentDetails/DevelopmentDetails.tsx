import React from "react";

interface Props {
  developmentType: string
}

const DevelopmentDetails: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  const {developmentType} = props
  return (
    <div className="development-details form-field">
      <h5>Development Details</h5>
      <form>
      {developmentType === "Residential" ? 
      <>
        <p>Home Type*</p>
        <select onMouseEnter={(e) => { e && e.currentTarget.classList.add("activated")}} 
          onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}} >
          <option value="" disabled selected>Home Type*</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>

        <p>Development Name</p>
        <input placeholder="Subdivision or Development" /> 
      </>
      : 
      <>
        <p>{developmentType} Description</p>
        <input className="commercial-extended-input" placeholder={`${developmentType} Description`} /> 

        <p>{developmentType} Name</p>
        <input placeholder={`${developmentType} Name`} /> 
      </>
      }
      <div className="input-inline-block">
        <p>City*</p>
        <input placeholder="City, Township, or Village" /> 
      </div>
      <div className="input-inline-block">
        <p>Zip Code*</p>
        <input placeholder="12345" /> 
      </div>

      <p>Cross-Streets*</p>
      <input className="commercial-extended-input" placeholder="Between Example and Example" /> 
      </form>
      <hr />
    </div>
  );
};

export default DevelopmentDetails;