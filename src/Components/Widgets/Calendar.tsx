import React, { useEffect, useState, CSSProperties} from "react";
import "./Calendar.scss";
import CalendarIcon from "../../assets/icons/calendar-icon.svg";
import CalendarIconWhite from "../../assets/icons/calendar-icon-white.svg";
import moment from "moment";
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import Tooltip from "../common/Tooltip/Tooltip"

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import { string } from "prop-types";

interface DateAvailableProps{
    date: Date
    endTime: string
    installation: number
    premiseID: number
    startTime: string
    zipExt: number
};

const Calendar: React.FC<{
    startDate?       : string;
    endDate?        : string;
    slot?           : string;
    note?           : string;
    showTime?       : boolean;
    inputCalendar?  : boolean;
    inputDataState? : { data: string, setData: (args:string|Date) => void }
    inputTime?      : boolean;
    className?      : string;
    dates?          : Array<DateAvailableProps>
}> = ({
    startDate,
    endDate,
    slot,
    note,
    showTime = true,
    inputCalendar = false,
    inputDataState = null,
    inputTime = false,
    className = "",
    dates
}): any => {{
    const [selectedDay, setSelectedDay] = useState();
    const [selectedTimes, setSelectedTimes] = useState("");
    const FORMAT = "ddd MMM Do YYYY"

    const hasOccurred  = moment().isAfter(endDate ? endDate : startDate)
    const hasDateRange = endDate ? true : false;
    const separator    = <span className = "date-separator">&nbsp;-&nbsp;</span>;

    const getTimeSlot = () => {
        switch(slot){
            case "AM":
                return '8AM - 11AM';
            case "PM":
                return '12PM - 4PM';
            case "All Day":
                return '8AM - 4PM';
        }
    };

    interface selectBoxValues {
        type: string,
        props: { value: string, selected: boolean, disabled: boolean },
        innerHTML: string
    }

    const iterateSelect = (arr: Array<selectBoxValues>) => {
        return (arr.map((obj) => {
          const { type, props, innerHTML } = obj;
          const el = React.createElement(type, props, innerHTML);
          return el;
        }))
      }

    const getSelectTimeSlots = (slot: string) => {
        switch(slot) {
            case "8:00 - 12:00":
                return [
                    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select Time Slot"},
                    { type: "option", props: { value: "8AM-11AM", selected: false }, innerHTML: "AM (8:00 AM–11:00 AM)" }
                  ];
            case "12:00 - 4:00":
                return [
                    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select Time Slot"},
                    { type: "option", props: { value: "12PM-4PM", selected: false }, innerHTML: "PM (12:00 PM–4:00 PM)" },
                  ];
            case "8:00 - 4:00":
                return [
                    { type: "option", props: { value: "", selected: false, disabled: true }, innerHTML: "Select Time Slot"},
                    { type: "option", props: { value: "8AM-11AM", selected: false }, innerHTML: "AM (8:00 AM–11:00 AM)" },
                    { type: "option", props: { value: "12PM-4PM", selected: false }, innerHTML: "PM (12:00 PM–4:00 PM)" },
                    { type: "option", props: { value: "8AM-4PM", selected: false }, innerHTML: "Any Time (8:00 AM–4:00 PM)" }
                  ];
        }
    };

    const event = {
        title      : 'Meter Installation',
        description: 'A DTE crew will install your meter, connecting your meter and fuel line to the service line',
        startTime  : moment(startDate).hour(8).minute(0).format(),
        endTime    : moment(endDate).hour(16).minute(0).format(),
        location   : ''
    };

    const handleDayClick = (day: Date) => {

        if(day !== selectedDay && dates !== undefined) {
            let found = false;
            let date = dates.find((obj: any) => {
                let date = new Date(obj.date).toString().slice(0, 15);
                if(date === day.toString().slice(0, 15)) {
                    found = true;
                    return obj;
                }
            }) as {date: Date, startTime: string, endTime: string};

            if(found) {
                setSelectedDay(day);
                setSelectedTimes(`${date.startTime} - ${date.endTime}`)
                if(inputDataState){
                    inputDataState.setData(day);
                }
            }
        } else {
            if(inputDataState){
                setSelectedDay(day);
                inputDataState.setData(day);
            }
        }
    };

    const getFormattedDate = (date: Date) => {
        return moment(date).format(FORMAT);
    }


    const calendarDateSelector = () => {
        if(dates && dates.length) {
            let arr = dates.map((obj) => { return new Date(obj.date)} )
            const modifiers = { highlighted: arr }
            return (
                <DayPicker
                className="select-limited-date"
                onDayClick={handleDayClick}
                selectedDays={selectedDay}
                showOutsideDays={true}
                modifiers={modifiers}
                />)
        } else {
            return <DayPicker
            onDayClick={handleDayClick}
            selectedDays={inputDataState && inputDataState.data.length ? inputDataState.data : selectedDay}
            showOutsideDays={true}
            />
        }
    }

    const calendarDateToLoad = () => {
        if(inputDataState && inputDataState.data.length) {
            return moment(inputDataState.data).format('ddd. MMM Do, YYYY');
        } else if(selectedDay) {
            return moment(selectedDay).format('ddd. MMM Do, YYYY')
        } else {
            return;
        }
    }

    return (
        <>
        {inputCalendar ?
        <div className="calendar-widget-wrapper">
            <div className={`calendar-display-wrapper ${className}`}>
                <div className={`calendar-bar-wrapper ${className}`}>
                    <input className="white-calendar-date-wrapper" placeholder="Select Date" contentEditable={false} value={calendarDateToLoad()}>
                        {/* <span contentEditable={false} className="day-wrapper"> */}

                        {/* </span> */}
                    </input>
                    <Tooltip tooltipBody={calendarDateSelector()} eventTrigger="click" className="calendar" selectedDay={selectedDay}>
                        <div className="white-calendar-icon-wrapper">
                            <img src={CalendarIconWhite} title="Scheduled date" alt="Scheduled date" />
                        </div>
                    </Tooltip>
                </div>
                { inputTime &&
                <div className="select-wrapper">
                    <select className="select-calendar-bar-wrapper">
                        { selectedTimes.length ? (
                            <>
                            {iterateSelect(getSelectTimeSlots(selectedTimes) as any)}
                            </>
                        ) : (
                            <option value="" disabled selected>Select Time Slot</option>
                        )}
                    </select>
                </div>
                }
            </div>
        </div>
        :
        <div className="calendar-widget-wrapper">
            <div className="display-wrapper">
                <div className="bar-wrapper">
                    <div className="icon-wrapper">
                        <img src={CalendarIcon} title="Scheduled date" alt="Scheduled date" />
                    </div>
                    <div className="date-wrapper">
                        <span className="day-wrapper">
                            {hasDateRange ? moment(startDate).format('ddd. MMM Do') : moment(startDate).format('ddd. MMM Do, YYYY')}
                            {hasDateRange && separator}
                        </span>
                        {hasDateRange && (
                            <span className="day-wrapper">
                                {moment(endDate).format('ddd. MMM Do, YYYY')}
                            </span>
                        )}
                        {showTime && (
                            <span className="time-wrapper">
                                {getTimeSlot()}
                            </span>
                        )}
                    </div>
                    {!hasOccurred && (
                        <div className="controls-wrapper">
                            <AddToCalendar
                                event              = {event}
                                buttonLabel        = "Add to Calendar"
                                rootClass          = "add-to-calendar-wrapper"
                                dropdownClass      = "dropdown-wrapper"
                                buttonWrapperClass = "calendar-button-wrapper"
                                buttonClassClosed  = "closed"
                                buttonClassOpen    = "open"
                            />
                        </div>
                    )}
                </div>
            </div>
            {!hasOccurred || note && (
                <div className="note-wrapper">
                    <p>{note || "If this time is no longer convenient, please contact your DTE representative to reschedule."}</p>
                </div>
            )}
        </div>
        }
        </>
    );
}}

export default Calendar;