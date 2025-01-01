"use client"

import React, { ChangeEvent } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type:string,
    className?:string;
    index?:number
    ref?:React.Ref<HTMLInputElement>
    onChangeValue?:(event:ChangeEvent<HTMLInputElement>, index:number) => void
    onBackSpace?:(event:React.KeyboardEvent<HTMLInputElement>, index:number) => void
    startIcon?:React.ReactNode
 
}


const OTPInput = (
    {type, className,ref,onChangeValue,onBackSpace, index,startIcon, ...props}:InputProps
) => {

  
const customOnChangeInput = (event:ChangeEvent<HTMLInputElement>) => {


  if(onChangeValue && index !=undefined)  {

    
    onChangeValue(event, index);
    
  }
}

const customOnBackspace = (event:React.KeyboardEvent<HTMLInputElement>) => {

  if(onBackSpace && index !=undefined)  {
  
    onBackSpace(event, index);
    
  }


}


  return (
    <div className="m-0 p-0 relative">
   <input 
   ref={ref}
   type={type} 
   onChange={customOnChangeInput}
   onKeyUp={customOnBackspace}
   className={`border  p-2  w-full rounded-md pr-10
    ${className || " "}`}
   {...props}
   
   >
    
    </input>

    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" id="icon">
      {startIcon}
    </div>
    </div>
  )
}

export default OTPInput
