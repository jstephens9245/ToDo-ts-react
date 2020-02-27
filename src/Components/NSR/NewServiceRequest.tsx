import React, { useState, useEffect, useContext, useReducer, createContext, useCallback, createRef }  from "react";
import Card from "../common/Card/Card";
import ButtonPrimary from "../common/ButtonPrimary/ButtonPrimary";
import NewServiceProgressBar from "./NewServiceProgressBar/NewServiceProgressBar";
import ProjectInformation from "./ProjectInformation/ProjectInformation";
import ServiceInformation from "./ServiceInformation/ServiceInformation";
import ContactInformation from "./ContactInformation/ContactInformation";
import ReviewNSubmit from "./ReviewNSubmit/ReviewNSubmit"

import { Action, initialState, reducer, State } from "./NewServiceRequestContext";
import "./NewServiceRequest.scss"
import { create } from "domain";


const ServiceRequestProvider = createContext(initialState);
const ServiceRequestDispatchContext = createContext((() => 0) as React.Dispatch<Action>);

const NewServiceRequest: React.FunctionComponent = (): React.ReactElement => {
  const [activeStep, setActiveStep] = useState("1");
  // const [canSubmit, setCanSubmit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const setServiceNeeded = useCallback((data) => dispatch({ type: 'setServiceNeeded', serviceNeeded: data }), [dispatch]);
  const setDenialOfService = useCallback((data) => dispatch({ type: 'setDenialOfService', denialOfService: data }), [dispatch]);
  const setCanSubmit = useCallback((data) => dispatch({ type: 'setCanSubmit', canSubmit: data }), [dispatch]);


  const setActive = (e?: any, status?: string) => {
    // console.log("activeStep", state);
    let key: string = ""
    if(status === "previous") {
      key = "" + (Number(activeStep) - 1)
    } else {
      if(e !== undefined) {
        key = e.target.id.split("serviceStep-")[1]
      } else {
        if(activeStep !== "4") {
          key = "" + (Number(activeStep) + 1)
        } else {
          key = "1"
        }
      }
    }
    if(key !== activeStep) {
      // service Icons add and remove for active/completed
      let serviceStepElementToAdd = document.getElementById('serviceStep-'+key);
      serviceStepElementToAdd && serviceStepElementToAdd.classList.add("active");
      serviceStepElementToAdd && serviceStepElementToAdd.classList.remove("completed");

      let serviceStepElementToRemove = document.getElementById('serviceStep-'+activeStep);
      serviceStepElementToRemove && serviceStepElementToRemove.classList.remove("active");
      if(status === "completed"){ serviceStepElementToRemove && serviceStepElementToRemove.classList.add("completed"); }
      // service texts add and remove for active/completed
      let textElementToAdd = document.getElementById('serviceText-'+key);
      textElementToAdd && textElementToAdd.classList.add("active");
      textElementToAdd && textElementToAdd.classList.remove("completed");

      let textElementToRemove = document.getElementById('serviceText-'+activeStep);
      textElementToRemove && textElementToRemove.classList.remove("active");
      if(status === "completed"){ textElementToRemove && textElementToRemove.classList.add("completed"); }
      setActiveStep(key)
    }

  }
  useEffect(() => {state.tools.canSubmit && setCanSubmit(false);}, [activeStep])

  const nextButton = (
    <ButtonPrimary
      id="next-btn"
      disabled = {!state.tools.canSubmit}
      onClick={() => {
          window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
          });
          setTimeout(() => {
            setActive(undefined, "completed");
          }, 500)
      }}
    >
      Next
    </ButtonPrimary>
  )
  const previousButton = (
    <ButtonPrimary
      id="previous-btn"
      className="margin-right-15"
      onClick={() => {
          window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
          });
          setTimeout(() => {
            setActive(undefined, "previous");
          }, 500)
      }}
    >
      Previous
    </ButtonPrimary>
  )


  const submitButton = (
    <ButtonPrimary
      onClick={() => {
          window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
          });
          setTimeout(() => {
            setActive(undefined, "completed");
          }, 500)
      }}
      className="submit-green margin-right-15"
    >
      Submit
    </ButtonPrimary>
  )
  const submitNDuplicateButton = (
    <ButtonPrimary
      onClick={() => {
          window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
          });
          setTimeout(() => {
            setActive(undefined, "completed");
          }, 500)
      }}
      className="submit-duplicate"
    >
      Submit & Duplicate
    </ButtonPrimary>
  )



  const switchStep = () => {
    switch(activeStep) {
    case "1":
      if(state.serviceInformation.serviceNeeded.length) {
        setServiceNeeded("")
        setDenialOfService(false);
      }
      return (
      <main id="projectInformation">
          <ProjectInformation />
          {nextButton}
      </main>
      );
    case "2":
      return (
        <main id="serviceInformation">
          <ServiceInformation />
          {previousButton}
          {nextButton}
        </main>
      );
    case "3":
      return (
        <main>
          <ContactInformation />
          {previousButton}
          {nextButton}
        </main>
      );
    case "4":
      return (
        <main>
          <ReviewNSubmit />
          {submitButton}
          {submitNDuplicateButton}
        </main>
      );
    }
  }

  return (
    <ServiceRequestDispatchContext.Provider value={dispatch} >

    <ServiceRequestProvider.Provider value={state} >
      <NewServiceProgressBar activeStep={activeStep} setActive={setActive} />
      {}
      <Card className="start-new-service narrow">
        {activeStep && switchStep()}
      </Card>
      <p className="narrow">If you have any questions or concerns, please contact us at 800.338.0178.</p>
    </ServiceRequestProvider.Provider>
    </ServiceRequestDispatchContext.Provider>
  );
};

export const someValidatorFunction = (validateField: any) => {
  return !validateField;
}

export const useDispatch = () => {
  return useContext(ServiceRequestDispatchContext);
};

export const useGlobalState = <K extends keyof State>(property: K) => {
  const state = useContext(ServiceRequestProvider);
  return state[property]; // only one depth selector for comparison
};

export default NewServiceRequest;
