"use client";
import React, { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from "react";
import OTPInput from "./ui/otp-input";

const OtpBox = forwardRef(({
    otpLength
}:{
    otpLength:number
}, ref) => {
    
  const box1 = useRef<HTMLInputElement>(null);
  const box2 = useRef<HTMLInputElement>(null);
  const box3 = useRef<HTMLInputElement>(null);
  const box4 = useRef<HTMLInputElement>(null);

  const arr = [box1, box2, box3, box4];

  const [ err, setError] = useState<boolean>(false);

  const validateOTP = () => {
    console.log("Validate otp is called")

    const otpValues = arr.map((box) => box.current?.value || "");
    const inValid = otpValues.every((value) => value !== "");

    if(!inValid) {
        setError(true);
    }

    return {
        inValid,
        otp:otpValues.join(""),

    }
  }

  useImperativeHandle(ref, () => ({
    validateOTP, // Exposing the function to the parent component
  }));



  const onChangeBox = (event:ChangeEvent, index:number) => {

    const value = arr[index].current?.value;
    if(value && value.length >1 && arr[index].current) {
        arr[index].current.value = value.slice(0,1);
    }

    if(index !=3 && value?.length == 1) {
        arr[index+1].current?.focus();
    } 

  }

  const onBackSpace = (event:React.KeyboardEvent<HTMLInputElement>, index:number) => {
    console.log(event.key)

    if(index !=0 && event.key == "Backspace" &&  arr[index]?.current?.value === "") {
        arr[index-1].current?.focus();
    } 

    if(event.key == "ArrowRight" && index !=3) {
        arr[index+1].current?.focus();

    }
    if(event.key == "ArrowLeft" && index !=0) {
        arr[index-1].current?.focus();

    }


  }

  
  const classNames = `aspect-square text-3xl text-center ${err?"border-red-500":""} `;

  return (
    <div className="flex gap-5 my-5">
        {Array(otpLength).fill(1).map((item, index) => (
   <OTPInput
   key={index}
   type="number"
   ref={arr[index]}
   index={index}
   onChangeValue={onChangeBox}
   className={classNames}
   onBackSpace={onBackSpace}
 />

        ))}

    </div>
  );
});

OtpBox.displayName = "OtpBox"
export default OtpBox;
