import React, { useState, useCallback, useLayoutEffect }  from "react";
import { useDispatch, useGlobalState, someValidatorFunction } from "../NewServiceRequest"
import { iterateSelect } from "../../utilities/utilities"

import ElectricServiceDetails from "./ElectricServiceDetails/ElectricServiceDetails"
import GasServiceDetails from "./GasServiceDetails/GasServiceDetails"
import "../NewServiceRequest.scss"

const ServiceInformation: React.FunctionComponent = (): React.ReactElement => {
  const [whatsAvailable, SetWhatsAvailable] = useState("both")

  const dispatch = useDispatch();
  const outdoorProtectiveLighting = useGlobalState('outdoorProtectiveLighting');
  const electricVehicleCharging = useGlobalState('electricVehicleCharging');

  const { serviceNeeded, denialOfService } = useGlobalState('serviceInformation');
  const setOutdoorProtectiveLighting = useCallback((data) => dispatch({ type: 'setOutdoorProtectiveLighting', outdoorProtectiveLighting: data }), [dispatch]);
  const setElectricVehicleCharging = useCallback((data) => dispatch({ type: 'setElectricVehicleCharging', electricVehicleCharging: data }), [dispatch]);

  const setServiceNeeded = useCallback((data) => dispatch({ type: 'setServiceNeeded', serviceNeeded: data }), [dispatch]);
  const setDenialOfService = useCallback((data) => dispatch({ type: 'setDenialOfService', denialOfService: data }), [dispatch]);

  const additionalServices = (
    <>
    <div className="development-details form-field">
      <h5>Additional Services</h5>
      <p className="margin-bot-20">
      DTE Energy offers a broad portfolio of customizable lighting and EV charging solutions.
      Select the products you’re interested in and we’ll help you learn which options and
      equipment are right for you.
      </p>
      <p className="margin-bot-20">
      Learn more about DTE’s Outdoor Protective Lighting and Electric Vehicle Charging offerings.
      </p>
      <label className="container-square">Outdoor Protective Lighting
        <input type="checkbox" name="checkbox" value="Outdoor Protective Lighting"
        onClick={() => { setOutdoorProtectiveLighting(!outdoorProtectiveLighting) }}
        checked={outdoorProtectiveLighting ? true : false } />
        <span className="checkmark-square"></span>
      </label>
      <label className="container-square">Electric Vehicle Charging
        <input type="checkbox" name="checkbox" value="Electric Vehicle Charging"
        onClick={() => { setElectricVehicleCharging(!electricVehicleCharging) }}
        checked={electricVehicleCharging ? true : false } />
        <span className="checkmark-square"></span>
      </label>
    </div>
      <hr className="last" />
    </>
  );

  const denyOtherServiceCheck = (
    <>
    <p className="margin-bot-20">Based on the information you provided, DTE Energy is also your {serviceNeeded === "electricService" ? "Natural Gas" : "Electric"} service provider.</p>
    <label className="container-square" >I do not need {serviceNeeded === "electricService" ? "Natural Gas" : "Electric"} service.
      <input id="checkToRender" type="checkbox" name="checkbox" value="checkToRender" onClick={() => {setDenialOfService(!denialOfService)}} checked={denialOfService ? true : false} />
      <span className="checkmark-square"></span>
    </label>
  </>
  )
  const checkType = () => {
    let htmlReturn = <></>
    if(serviceNeeded === "electricGasService") {
      htmlReturn = (<>
        <ElectricServiceDetails />
        <GasServiceDetails />
        {additionalServices}
      </>)
    } else if (serviceNeeded === "electricService") {
      htmlReturn = (<>
        <ElectricServiceDetails />
        {additionalServices}
      </>)
    } else if (serviceNeeded === "gasService") {
      htmlReturn = (<>
        <GasServiceDetails />
        {additionalServices}
      </>)
    }
    return htmlReturn
  }

  const serviceNeededArray = [
    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
    { type: "option", props: { value: "electricGasService", selected: false }, innerHTML: "New Electric & Gas Service" },
    { type: "option", props: { value: "electricService", selected: false }, innerHTML: "New Electric" },
    { type: "option", props: { value: "gasService", selected: false }, innerHTML: "New Gas" }
  ]

  useLayoutEffect(() => {
    if(serviceNeeded.length && denialOfService) {
      setDenialOfService(!denialOfService);
      let el = document.getElementById("checkToRender") as HTMLInputElement
      if(el) {
        el.checked = false;
      }
    }
  }, [serviceNeeded])

  const selectAttrWithData = {
    className: "commercial-extended-input activated",
    onClick: (e: any) => {
      setServiceNeeded(e.target.value);
    }
  }

  const selectAttrNoData = {
    ...selectAttrWithData,
    className: "commercial-extended-input",
    onMouseEnter: (e: any) => { e.currentTarget.classList.add("activated")},
    onMouseLeave: (e: any) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}},
  }

  const setCanSubmit = useCallback((data) => dispatch({ type: 'setCanSubmit', canSubmit: data }), [dispatch]);

  const SI = useGlobalState('serviceInformation');
  const ServiceD = useGlobalState('serviceDetails');
  const serviceElectric = { ...ServiceD.electricServiceDetails }
  const serviceGas = { ...ServiceD.gasServiceDetails }

  const validateServiceDGas: Array<any> = [ serviceGas.squareFootage, serviceGas.serviceStartDate ];
  const validateServiceDElectric: Array<any> = [ serviceElectric.serviceStartDate ];

  const whichServiceTypes = () => {
    switch(serviceNeeded) {
      case "electricGasService":
          return [...validateServiceDElectric, ...validateServiceDGas ]
      case "gasService":
          return [...validateServiceDGas ]
      case "electricService":
          return [...validateServiceDElectric ]
      default:
        return []
    }
  }

  useLayoutEffect(() => {
    if(serviceNeeded.length) {
      if(!whichServiceTypes().some(someValidatorFunction)) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }

    }
  }, [serviceNeeded, ...validateServiceDGas, ...validateServiceDElectric, denialOfService])

  return (
    <form>
      <h2 className="sectional-information-title">Service Information</h2>
      <p className="margin-bot-20">
      Based on the location you provided, the following products are availale in your service area:
      </p>
      <p>
      Select Services needed:
      </p>

      { serviceNeeded.length ?
        <div className="select-wrapper commercial-extended-input">
            <select {...selectAttrWithData}>
              {iterateSelect(serviceNeededArray, serviceNeeded)}
            </select>
        </div>
        :
        <div className="select-wrapper commercial-extended-input ">
          <select {...selectAttrNoData}>
            {iterateSelect(serviceNeededArray, serviceNeeded)}
          </select>
        </div>
      }

      {whatsAvailable === "both" && serviceNeeded.length && serviceNeeded !== "electricGasService" ?
      denyOtherServiceCheck
      : null}
      <hr className="last" />
      {whatsAvailable === "both" && denialOfService && serviceNeeded.length ? checkType() : null}
      {whatsAvailable === "both" && !denialOfService && serviceNeeded === "electricGasService" ? checkType() : null}
    </form>
  );
};

export default ServiceInformation;
