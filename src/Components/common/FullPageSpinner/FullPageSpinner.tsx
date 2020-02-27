import React from "react";
import "./FullPageSpinner.scss";

const FullPageSpinner = () => {
  return (
    <div className="full-page-spinner-container">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
  );
};

export default FullPageSpinner;
