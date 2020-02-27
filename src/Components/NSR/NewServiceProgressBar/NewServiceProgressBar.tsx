import React, { useState, useEffect }  from "react";
import Card from "../../common/Card/Card";
import "./NewServiceProgressBar.scss"

interface Props {
    activeStep: string
    setActive: (event: React.SyntheticEvent) => void;
}
const NewServiceProgressBar: React.FC<Props> = (props): React.ReactElement => {
  const [activeStep, setActiveStep] = useState(props.activeStep|| "1");
  
  // test data for stepper
  const ArrayTestObject: any = { steps: [{ num: "1"}, { num: "2" }, { num: "3" }, { num: "4" }] };

  const progressBarText = (
    <div className="start-new-service-progress-bar-text-wrapper">
      <div id="serviceText-1" className={`service-step-container ${ activeStep === "1" ? "active" : "" }`}>
        Project information
      </div>
      <div className="liner" style={{display: "none"}} />
      <div  id="serviceText-2" className={`service-step-container ${ activeStep === "2" ? "active" : "" }`}>
        Service Information
      </div>
      <div className="liner" style={{display: "none"}} />
      <div id="serviceText-3" className={`service-step-container ${ activeStep === "3" ? "active" : "" }`}>
        Contact Information
      </div>
      <div className="liner" style={{display: "none"}} />
      <div id="serviceText-4" className={`service-step-container ${ activeStep === "4" ? "active" : "" } last-text`}>
        Review & Submit
      </div>
      <div className="liner" style={{display: "none"}} />
    </div>
  );

  const stepStatuses = () => (ArrayTestObject.steps.map(
    (
      step: { num: string },
      i   : number
    ): React.ReactElement =>{
      if(activeStep === step.num) {
       return (
        <div key={step.num} className="service-step-container">
          <div id={`serviceStep-${step.num}`} className="service-step active" onClick={(e: any) => {props.setActive(e)}}>
            {step.num}
          </div>
          {i !== ArrayTestObject.steps.length - 1 && <div className="liner" />}
        </div>
       )
      } else {
        return (
          <div key={step.num} className="service-step-container">
            <div id={`serviceStep-${step.num}`} className="service-step" onClick={(e: any) => {props.setActive(e)}}>
              {step.num}
            </div>
            {i !== ArrayTestObject.steps.length - 1 && <div className="liner" />}
          </div>
        )
      }
    } 
  ));

  const progressBar = (
    <>
      <div className="progress-bar">{stepStatuses()}</div>
    </>
  );
  // useEffect( () => { progressBar(); progressBarText(); console.log("hitting")}, [props.activeStep])
  
  return (
    <Card className="start-new-service-progress-bar narrow">

      <div className="start-new-service-progress-bar-wrapper">
            {progressBar}
      </div>

      {/* line stepper text for ^ progress bar. uses same HTML format for consistency */}
      {progressBarText}
    </Card>
  );
};

export default NewServiceProgressBar;