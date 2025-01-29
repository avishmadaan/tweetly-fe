import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const DateTimePicker = () => {
    const [value, setValue] = useState(null);

    return (
        <DatePicker
            placeholder="Select date & Time"
            className="shadow-none bg-white text-black dark:bg-black dark:text-white"
            value={value}
            onChange={setValue}
            numberOfMonths={1}
            minDate={new Date()}
            inputClass="p-4 order rounded-md bg-transparent border cursor-pointer placeholder-black dark:placeholder-white"
            format="DD/MM/YYYY hh:mm A"
            plugins={[<TimePicker key={1} position="bottom" hideSeconds />]}
        />
    );
};

export default DateTimePicker;
