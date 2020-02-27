import React, { useCallback } from "react";
import { useDispatch, useGlobalState } from "../../NewServiceRequest"
import { iterateSelect } from "../../../utilities/utilities"

import "../../NewServiceRequest.scss"

import Calendar from '../../../Widgets/Calendar';
import moment from "moment";
// const {dates} = require("../../../../mockAppts.json");

const ElectricServiceDetails: React.FunctionComponent = (): React.ReactElement => {

  const dispatch = useDispatch();
  const { jobType } = useGlobalState('projectInformation');
  const serviceDetails = useGlobalState('serviceDetails');
  const { serviceOptions, requestType, constructionMeterType, ampsRequired, serviceLength, voltageClass, additionalNotes, serviceStartDate } = serviceDetails.electricServiceDetails;

  const setRequestType = useCallback((data) => dispatch({ type: 'setRequestType', requestType: data }), [dispatch]);
  const setElectricAdditionalNotes = useCallback((data) => dispatch({ type: 'setElectricAdditionalNotes', additionalNotes: data }), [dispatch]);
  const setElectricServiceStartDate = useCallback((data) => dispatch({ type: 'setElectricServiceStartDate', serviceStartDate: data }), [dispatch]);
  const setSelects = useCallback((selectType, identifier, data) => dispatch({ type: selectType, [identifier]: data }), [dispatch]);

  const serviceOptionsArray = [
    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
    { type: "option", props: { value: "Primary Service", selected: false }, innerHTML: "Primary Service" },
    { type: "option", props: { value: "Overhead", selected: false }, innerHTML: "Secondary Service - Overhead" },
    { type: "option", props: { value: "Underground", selected: false }, innerHTML: "Secondary Service - Underground" }
  ]
  const constructionMeterTypeArray = [
    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
    { type: "option", props: { value: "Single, Dual", selected: false }, innerHTML: "Single, Dual" },
    { type: "option", props: { value: "Multiple", selected: false }, innerHTML: "Multiple" },
    { type: "option", props: { value: "Temporary", selected: false }, innerHTML: "Temporary" },
    { type: "option", props: { value: "Pre-Construction Mount", selected: false }, innerHTML: "Pre-Construction Mount" }
  ]

  const ampsOptionsArray = [
    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
    { type: "option", props: { value: "100", selected: false }, innerHTML: "100" },
    { type: "option", props: { value: "200", selected: false }, innerHTML: "200" },
    { type: "option", props: { value: "300", selected: false }, innerHTML: "300" },
    { type: "option", props: { value: "400", selected: false }, innerHTML: "400" }
  ]
  const serviceLengthOptionsArray = [
    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
    { type: "option", props: { value: "200ft or Less", selected: false }, innerHTML: "200ft or Less" },
    { type: "option", props: { value: "More than 200ft", selected: false }, innerHTML: "More than 200ft" },
  ]
  const voltageClassOptionsArray = [
    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
    { type: "option", props: { value: "single phase", selected: false }, innerHTML: "single phase 120/240 V" },
    { type: "option", props: { value: "three phase", selected: false }, innerHTML: "Three phase 120/240 120/208 277/480" },
  ]

  const selectNoDataAttr = {
    onMouseEnter: (e: any) => { e.currentTarget.classList.add("activated")},
    onMouseLeave: (e: any) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}},
    onClick: (e: any) => { setSelects(e.target.name, e.target.id, e.target.value) }
  }
  const selectAttr = {
    className: "activated",
    onClick: (e: any) => { setSelects(e.target.name, e.target.id, e.target.value) }
  }

  const extendedSelectNoDataAttr = {
    ...selectNoDataAttr,
    className: "commercial-extended-input",
  }
  const extendedSelectAttr = {
    className: "commercial-extended-input activated",
    onClick: (e: any) => { setSelects(e.target.name, e.target.id, e.target.value) }
  }


  const newSubDivisionElectricHTML = (
    <>
      <label className="container-square">Temp Service
        <input type="checkbox" name="checkbox" value="Temp Service" />
        <span className="checkmark-square"></span>
      </label>
      <label className="container-square">Pumps/lift station
        <input type="checkbox" name="checkbox" value="Pumps/lift station" />
        <span className="checkmark-square"></span>
      </label>
      <label className="container-square">Club House
        <input type="checkbox" name="checkbox" value="Club House" />
        <span className="checkmark-square"></span>
      </label>
      <label className="container-square">House Meter
        <input type="checkbox" name="checkbox" value="House Meter" />
        <span className="checkmark-square"></span>
      </label>
      <label className="container-square">Street Lights
        <input type="checkbox" name="checkbox" value="Street Lights" />
        <span className="checkmark-square"></span>
      </label>
      <label className="container-square">Private Lights
        <input type="checkbox" name="checkbox" value="Private Lights" />
        <span className="checkmark-square"></span>
      </label>
    </>
  )

  const singlePhaseElectric = (
    <>
      <p>Power Needs</p>
      <div className="select-wrapper">
        <select onMouseEnter={(e) => { e.currentTarget.classList.add("activated")}}
          onMouseLeave={(e) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}}} >
          <option value="" disabled selected>Select</option>
          <option value="single phase">single phase 120/240 V</option>
          <option value="Three phase">Three phase 120/240 120/208 277/480</option>
        </select>
      </div>
      <p className="margin-bot-20">Additional Power Needs</p>

      <p>Total Single Phase KW Demand</p>
      <input className="" placeholder="KW" />
      {newSubDivisionElectricHTML}
      <label className="container-square-last">Other
        <input type="checkbox" name="checkbox" value="Other" onClick={() => {
          let element = document.getElementById("other-KW-box") as HTMLInputElement
          element.disabled = !element.disabled;
          }} />
        <span className="checkmark-square"></span>
      </label>
      <input id="other-singleKW-box" className="other-box" placeholder="input label" disabled />
    </>
  )

  const threePhaseElectric = (
    <>
      <p>Total Three Phase KW Demand</p>
      <input className="" placeholder="KW" />
      {newSubDivisionElectricHTML}
      <label className="container-square-last">Other
        <input type="checkbox" name="checkbox" value="Other" onClick={() => {
          let element = document.getElementById("other-KW-box") as HTMLInputElement
          element.disabled = !element.disabled;
          }} />
        <span className="checkmark-square"></span>
      </label>
      <input id="other-singleKW-box" className="other-box" placeholder="input label" disabled />
      <p>Relocation/Removal Needed?</p>
      <label className="container">Yes
          <input type="radio" name="radio" value="New Constuction" />
          <span className="checkmark"></span>
        </label>
        <label className="container">No
          <input type="radio" name="radio" value="Existing Building"/>
          <span className="checkmark"></span>
      </label>
      <p>Estimated Road Paving Completion Date</p>
      {/* {dates && dates.length && */}
      <Calendar
      inputDataState = { { data: serviceStartDate, setData: setElectricServiceStartDate } }
      inputCalendar = {true}
      className = "electric-calendar"
      />
      {/* <Calendar
          startDate = {moment(dates[0].date).format()}
          endDate   = {moment(dates[dates.length - 1].date).format()}
          dates     = {dates}
          inputCalendar = {true}
          className = "electric-calendar"
      /> */}
      {/* } */}
    </>
  )

  const electricServiceDetails = (
    <div className="development-details form-field">
    <h5>Electric Service Details</h5>
    <p className="margin-bot-20">
    Tell us about your installation needs. If you are unsure about any service
    details, a DTE representative will help you finalize your project details
    once we receive your request.
    </p>
    <form>

    <p>Service Options</p>
    { serviceOptions.length ?
    <div className="select-wrapper commercial-extended-input">
      <select {...extendedSelectAttr } name="setServiceOptions" id="serviceOptions" >
          {iterateSelect(serviceOptionsArray, serviceOptions)}
      </select>
    </div>
    :
    <div className="select-wrapper commercial-extended-intput">
      <select {...extendedSelectNoDataAttr } name="setServiceOptions" id="serviceOptions" >
          {iterateSelect(serviceOptionsArray, serviceOptions)}
      </select>
    </div>
    }

    <p>This request is for:</p>
    <label className="container">Line & Meter
      <input onClick={() => {setRequestType("Line_n_Meter")}}  type="radio" name="radio" value="Line_n_Meter"
      checked={requestType === "Line_n_Meter" ? true : false } />
      <span className="checkmark"></span>
    </label>
    <label className="container">Meter(s) Only
      <input onClick={() => {setRequestType("MetersOnly")}}  type="radio" name="radio" value="MetersOnly"
      checked={requestType === "MetersOnly" ? true : false } />
      <span className="checkmark"></span>
    </label>

    <p>Constrution Meter Type</p>
    {constructionMeterType.length ?
      <div className="select-wrapper">
        <select {...selectAttr} name="setConstructionMeterType" id="constructionMeterType" >
          {iterateSelect(constructionMeterTypeArray, constructionMeterType)}
        </select>
      </div>
      :
      <div className="select-wrapper">
        <select {...selectNoDataAttr} name="setConstructionMeterType" id="constructionMeterType" >
          {iterateSelect(constructionMeterTypeArray, constructionMeterType)}
        </select>
      </div>
    }

    <div className="input-inline-block">
      <p>Amps Required</p>
      {ampsRequired.length ?
      <div className="select-wrapper">
        <select {...selectAttr} name="setAmpsRequired" id="ampsRequired" >
          {iterateSelect(ampsOptionsArray, ampsRequired)}
        </select>
      </div>
      :
      <div className="select-wrapper">
        <select {...selectNoDataAttr} name="setAmpsRequired" id="ampsRequired" >
          {iterateSelect(ampsOptionsArray, ampsRequired)}
        </select>
      </div>
      }
    </div>

    <div className="input-inline-block">
      <p>Service Length</p>
      { serviceLength.length ?
        <div className="select-wrapper">
          <select {...selectAttr} name="setServiceLength" id="serviceLength">
            {iterateSelect(serviceLengthOptionsArray, serviceLength)}
          </select>
        </div>
      :
        <div className="select-wrapper">
          <select {...selectNoDataAttr} name="setServiceLength" id="serviceLength">
            {iterateSelect(serviceLengthOptionsArray, serviceLength)}
          </select>
        </div>
      }
    </div>

    <p>Voltage Class</p>
    {voltageClass.length ?
      <div className="select-wrapper">
        <select {...selectAttr} name="setVoltageClass" id="voltageClass">
          {iterateSelect(voltageClassOptionsArray, voltageClass)}
        </select>
      </div>
    :
      <div className="select-wrapper">
        <select {...selectNoDataAttr} name="setVoltageClass" id="voltageClass">
          {iterateSelect(voltageClassOptionsArray, voltageClass)}
        </select>
      </div>
    }
    {jobType === "New Subdivision" ? <>{singlePhaseElectric} {threePhaseElectric}</> : null}
    <div className="additional-notes-container" >
      <p>Additional Notes</p>
      <textarea
        placeholder="Please provide any project details,
        installation requirements, or other information you would
        like to include as a part of your electric service request." value={additionalNotes} onChange={(e) => { setElectricAdditionalNotes(e.target.value)}} />
    </div>

    <p>When would you like your electric service to begin?*</p>
    {/* {dates && dates.length && */}
      <Calendar
        inputDataState = { { data: serviceStartDate, setData: setElectricServiceStartDate } }
        inputCalendar = {true}
        className = "electric-calendar"
      />
      {/* } */}
    <p className="grey-text">
      DTE will make every effort to accomodate your request but the date on which the
      work can be completed depends on a variety of factors and therefore may not be
      possible in the timeframe selected.
    </p>
    </form>
    <hr />
  </div>
  )

  return (
    <>
        {electricServiceDetails}
    </>
  );
};

export default ElectricServiceDetails;