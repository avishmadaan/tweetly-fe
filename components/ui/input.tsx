"use client"

import React, { ChangeEvent } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type:string,
    className?:string;
    ref?:React.Ref<HTMLInputElement>
    onChange?:(event:ChangeEvent<HTMLInputElement>) => void
    onBackSpace?:(event:React.KeyboardEvent<HTMLInputElement>) => void
    startIcon?:React.ReactNode
 
}


const Input = (
    {type, className,ref,onChange,onBackSpace,startIcon, ...props}:InputProps
) => {

  


  return (
    <div className="m-0 p-0 relative">
   <input 
   ref={ref}
   type={type} 
   onChange={onChange}
   onKeyUp={onBackSpace}
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

export default Input
