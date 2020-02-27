import React from "react";

interface Props {
  developmentType: string
}

const SiteDetails: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  const {developmentType} = props
  return (
    <>
      <form>
      <div className="input-inline-block">
        <p>Street Number</p>
        <input placeholder="Number" /> 
      </div>
      <div className="input-inline-block">
        <p>Street Name</p>
        <input placeholder="Name" /> 
      </div>

      <p>Unit Number</p>
      <input placeholder={`${developmentType === "Residential" ? "Apartment" : "Suite"} or Unit Number`} /> 
      <p>Lot Number</p>
      <input placeholder="Lot Number" /> 
      </form>
      <hr />
    </>
  );
};

export default SiteDetails;