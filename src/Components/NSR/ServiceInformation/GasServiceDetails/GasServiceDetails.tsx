import React, { useState, useEffect, useCallback} from "react";
import { useDispatch, useGlobalState } from "../../NewServiceRequest"
import { iterateSelect } from "../../../utilities/utilities"
import "../../NewServiceRequest.scss"
// import { identifier } from "@babel/types";

import Calendar from '../../../Widgets/Calendar';
import moment from "moment";
// const {dates} = require("../../../../mockAppts.json");

const GasServiceDetails: React.FunctionComponent = (): React.ReactElement => {
    const [otherApplianceHTMLData, setOtherApplianceHTMLData] = useState([]);

    const dispatch = useDispatch();
    const serviceDetails = useGlobalState('serviceDetails')
    const { squareFootage, undergroundFacilities, applianceLoad, additionalNotes, meterSize, serviceStartDate } = serviceDetails.gasServiceDetails
    const { furnaceSpaceHeaterLoad, waterHeaterLoad, clothesDryerLoad, stoveOvenLoad, otherAppliance, otherApplianceLoad } = applianceLoad;
    const { other, otherDetails } = undergroundFacilities

    const setSquareFootage = useCallback((data) => dispatch({ type: 'setSquareFootage', squareFootage: data }), [dispatch]);

    const setUndergroundFacilities = useCallback((identifier, data) => dispatch({ type: 'setUndergroundFacilities', facilityType: identifier, value: data }), [dispatch]);

    const setFurnaceSpaceHeaterLoad = useCallback((data) => dispatch({ type: 'setFurnaceSpaceHeaterLoad', furnaceSpaceHeaterLoad: data }), [dispatch]);
    const setWaterHeaterLoad = useCallback((data) => dispatch({ type: 'setWaterHeaterLoad', waterHeaterLoad: data }), [dispatch]);
    const setClothesDryerLoad = useCallback((data) => dispatch({ type: 'setClothesDryerLoad', clothesDryerLoad: data }), [dispatch]);
    const setStoveOvenLoad = useCallback((data) => dispatch({ type: 'setStoveOvenLoad', stoveOvenLoad: data }), [dispatch]);
    const setOtherAppliance = useCallback((data) => dispatch({ type: 'setOtherAppliance', otherAppliance: data }), [dispatch]);
    const setOtherApplianceLoad = useCallback((data) => dispatch({ type: 'setOtherApplianceLoad', otherApplianceLoad: data }), [dispatch]);

    const setGasAdditionalNotes = useCallback((data) => dispatch({ type: 'setGasAdditionalNotes', additionalNotes: data }), [dispatch]);
    const setGasServiceStartDate = useCallback((data) => dispatch({ type: 'setGasServiceStartDate', serviceStartDate: data }), [dispatch]);

    const setSelects = useCallback((selectType, identifier, data) => dispatch({ type: selectType, [identifier]: data }), [dispatch]);

    const otherApplianceHTML = (
    <div>
        <div className="input-inline-block">
        <input placeholder="Appliance Type" value={otherAppliance} onChange={(e) => { setOtherAppliance(e.target.value)}} />
        </div>
        <div className="input-inline-block">
        <input placeholder="BTUs" value={otherApplianceLoad} onChange={(e) => { setOtherApplianceLoad(e.target.value)}} />
        </div>
    </div>
    )
    const selectNoDataAttr = {
        onMouseEnter: (e: any) => { e.currentTarget.classList.add("activated")},
        onMouseLeave: (e: any) => { if(e.currentTarget.value === ""){ e.currentTarget.classList.remove("activated")}},
        onClick: (e: any) => { setSelects(e.target.name, e.target.id, e.target.value) }
    }
    const selectAttr = {
        className: "activated",
        onClick: (e: any) => { setSelects(e.target.name, e.target.id, e.target.value) }
    }

    const meterSizeArray = [
        { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select"},
        { type: "option", props: { value: "402 - minimum -300,000 BTU", selected: false }, innerHTML: "402 - minimum -300,000 BTUs" },
        { type: "option", props: { value: "403 - 301,000 -550,000 BTU", selected: false }, innerHTML: "403 - 301,000 -550,000 BTUs" },
        { type: "option", props: { value: "404 - 550,000 -1,000,000 BTUs", selected: false }, innerHTML: "404 - 550,000 -1,000,000 BTUs" },
      ]

    useEffect(() => {}, [otherApplianceHTMLData])

    return (
        <>
        <div className="development-details form-field">
        <h5>Gas Service Details</h5>
        <p className="margin-bot-20">
        Tell us about your gas installation needs. If you are unsure about any service
        details, a DTE representative will help you finalize your project details once
        we receive your request. (Required fields are marked with “*”)
        </p>
        <form>

        <p>Home Square Footage*</p>
        <input className="" placeholder="Sq Feet" value={squareFootage} onChange={(e) => { setSquareFootage(e.target.value)}} />

        <p>Underground Facilities:</p>
        <label className="container-square">City Water / Sewer / Geothermal
            <input type="checkbox" name="checkbox" value="City Water / Sewer / Geothermal"
            onClick={() => {setUndergroundFacilities("City Water / Sewer / Geothermal", !undergroundFacilities['City Water / Sewer / Geothermal'])}}
            checked={undergroundFacilities['City Water / Sewer / Geothermal'] ? true: false} />
            <span className="checkmark-square"></span>
        </label>
        <label className="container-square">Sprinkler System
            <input type="checkbox" name="checkbox" value="Sprinkler System"
            onClick={() => {setUndergroundFacilities('Sprinkler System', !undergroundFacilities['Sprinkler System'])}}
            checked={undergroundFacilities['Sprinkler System'] ? true: false}/>
            <span className="checkmark-square"></span>
        </label>
        <label className="container-square">Septic Field / Well
            <input type="checkbox" name="checkbox" value="Septic Field / Well"
            onClick={() => {setUndergroundFacilities('Septic Field / Well', !undergroundFacilities['Septic Field / Well'])}}
            checked={undergroundFacilities['Septic Field / Well'] ? true: false}/>
            <span className="checkmark-square"></span>
        </label>
        <label className="container-square">Private Underground Wiring
            <input type="checkbox" name="checkbox" value="Private Underground Wiring"
            onClick={() => {setUndergroundFacilities('Private Underground Wiring', !undergroundFacilities['Private Underground Wiring'])}}
            checked={undergroundFacilities['Private Underground Wiring'] ? true: false}/>
            <span className="checkmark-square"></span>
        </label>
        <label className="container-square">Underground Fence
            <input type="checkbox" name="checkbox" value="Underground Fence"
            onClick={() => {setUndergroundFacilities('Underground Fence', !undergroundFacilities['Underground Fence'])}}
            checked={undergroundFacilities['Underground Fence'] ? true: false}/>
            <span className="checkmark-square"></span>
        </label>
        <label className="container-square-last">Other
            <input type="checkbox" name="checkbox" value="Other" onClick={() => {
            let element = document.getElementById("other-box") as HTMLInputElement
            element.disabled = !element.disabled;
            setUndergroundFacilities('other', !other);
            setUndergroundFacilities('otherDetails', "");
            }}
            checked={other ? true: false} />
            <span className="checkmark-square"></span>
        </label>
        <input id="other-box" className="other-box" placeholder="input label" disabled={!other ? true: false}
        onChange={(e) => { setUndergroundFacilities('otherDetails', e.target.value) }} value={otherDetails} />

        <p className="weighted">Appliance Load</p>

        <p>Furnace / Space Heater Load</p>
        <input placeholder="BTU's" value={furnaceSpaceHeaterLoad} onChange={(e) => { setFurnaceSpaceHeaterLoad(e.target.value)}} />
        <p>Water Heater Load</p>
        <input placeholder="BTU's" value={waterHeaterLoad} onChange={(e) => { setWaterHeaterLoad(e.target.value)}} />
        <p>Clothes Dryer Load</p>
        <input placeholder="BTU's" value={clothesDryerLoad} onChange={(e) => { setClothesDryerLoad(e.target.value)}} />
        <p>Stove / Oven Load</p>
        <input placeholder="BTU's" value={stoveOvenLoad} onChange={(e) => { setStoveOvenLoad(e.target.value)}} />

        <p>Other Appliance</p>
        {otherApplianceHTML}

        { otherApplianceHTMLData.length >= 1 ?
                <>
                <div className="development-details form-field">
                    {otherApplianceHTMLData.map((elem, i) =>
                    <><a
                        className="remove-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            let array: any = [...otherApplianceHTMLData];
                            if(array.length > 1) {
                                array.splice(i, 1)
                                setOtherApplianceHTMLData(array);
                            } else {
                                setOtherApplianceHTMLData(array.pop());
                            }
                        }}>Remove</a>{elem}</> || null)}
                </div>
                <div className="development-details form-field">
                    <a className="other-appliance" onClick={() => {
                    let array: any = otherApplianceHTMLData.length ? [...otherApplianceHTMLData, otherApplianceHTML] : [otherApplianceHTML]
                    setOtherApplianceHTMLData(array)
                    }}>+ Other Appliance</a>
                </div>
                </>:
            <a className="other-appliance" onClick={() => {
                let array: any = otherApplianceHTMLData.length ? [...otherApplianceHTMLData, otherApplianceHTML] : [otherApplianceHTML]
                setOtherApplianceHTMLData(array)
                }}>+ Other Appliance</a>}

        <p>Desiered Meter Size</p>
        {meterSize.length ?
        <div className="select-wrapper">
            <select {...selectAttr} name="setMeterSize" id="meterSize" >
                {iterateSelect(meterSizeArray, meterSize)}
            </select>
        </div>
        :
        <div className="select-wrapper">
            <select {...selectNoDataAttr} name="setMeterSize" id="meterSize" >
                {iterateSelect(meterSizeArray, meterSize)}
            </select>
        </div>
        }

        <div className="additional-notes-container" >
            <p>Additional Notes</p>
            <textarea
            placeholder="Please provide any project details,
            installation requirements, or other information you would
            like to include as a part of your electric service request."
            value={additionalNotes} onChange={(e) => { setGasAdditionalNotes(e.target.value)}}
            />
        </div>

        <p>When would you like your gas service to begin?*</p>
        <Calendar
        inputDataState = { { data: serviceStartDate, setData: setGasServiceStartDate } }
        inputCalendar = {true}
        className = "electric-calendar"
        />
        <p className="grey-text">
            DTE will make every effort to accomodate your request but the date on which the
            work can be completed depends on a variety of factors and therefore may not be
            possible in the timeframe selected.
        </p>
        </form>
        <hr />
        </div>
        </>
    );
};

export default GasServiceDetails;