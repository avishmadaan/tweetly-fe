import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const DateTimePicker = () => {
    const [value, setValue] = useState(null);

    return <DatePicker
    placeholder={`${new Date()}`} 
    className="shadow-none"
    value={value} 
    onChange={setValue}
    numberOfMonths={1}
   type="input-icon"
    
    minDate={new Date()}
    inputClass="p-4 order rounded-md bg-transparent border cursor-pointer"
    
    format="DD/MM/YYYY hh:mm A"
    plugins={[<TimePicker key={1} position="bottom" />]}
     />;
}

export default DateTimePicker
