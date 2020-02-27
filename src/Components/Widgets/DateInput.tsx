import React, { useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import "./DateInput.scss";
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import CalendarIcon from "../../assets/icons/calendar-icon-white.svg";

// @TODO: Disable 2 days after current date. Test with weekends and if those count
// @TODO: Add unselect day functionality
// @TODO: Add multi day functionality and prop to turn it on and off
// @TODO: Confirm all component variations and props needed for different instances
// @TODO: Add functionality to open day picker when icon is clicked
// @TODO: Create validation and error feedback
// @TODO: Disabled date can still be entered in the field. Figure out a way prevent that and/or give user validation error
// @TODO: Make 'Schedule' button functional

interface DateInputProps{
    date?          : any;
    allowMultiDays?: boolean;
};

const DateInput = (props: DateInputProps) => {
    const [selectedDay, setSelectedDay] = useState();
    const FORMAT = "ddd. MMM Do, YYYY"

    useEffect(() => {
        // console.log('selectedDay: ', selectedDay);
    }, [selectedDay]);

    
    const handleDayClick = (day: any) => {
        setSelectedDay(day);
    };

    const getFormattedDate = (date: Date, format: string, locale: string) => {
        return moment(date).format(FORMAT);
    }
    
    return(
        <div className="date-select-wrapper">
            <div className="inputs-wrapper">
                <div className="input-wrapper day-input">
                    <DayPickerInput
                        format      = {FORMAT}
                        formatDate  = {getFormattedDate}
                        onDayChange = {day => console.log(day)}
                        keepFocus   = {true}
                        dayPickerProps = {{
                            showOutsideDays: true,
                            onDayClick     : handleDayClick,
                            selectedDays   : selectedDay,
                            fromMonth      : new Date(moment().format()),
                            modifiers      : {
                                disabled: [
                                    {
                                        daysOfWeek: [0, 6]
                                    },
                                    {
                                        before: new Date(moment().add(2, 'days').format())
                                    }
                                ]
                            }
                        }}
                        inputProps = {{
                            placeholder: 'Select Date',
                            className  : 'date-input',
                        }}
                    />
                    <div className="input-icon">                    
                        <img src={CalendarIcon} title="Scheduled date" alt="Scheduled date" />
                    </div>
                </div>
                <div className="input-wrapper time-input">
                    <select className="date-input" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Select Time Slot</option>
                        <option value="AM">AM (8am - 11am)</option>
                        <option value="PM">PM (12pm - 4pm)</option>
                        <option value="ANY">All day (8am - 4pm)</option>
                    </select>
                </div>
            </div>
            <div className="button-wrapper">
                <button
                    className = "btn-primary"
                    onClick   = {() => console.log('clicked')}
                >
                    Schedule
                </button>
            </div>
        </div>
    );
};

export default DateInput;