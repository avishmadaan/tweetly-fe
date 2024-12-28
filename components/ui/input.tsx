"use client"

import React, { ChangeEvent } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type:string,
    className?:string;
    index?:number
    ref?:React.Ref<HTMLInputElement>
    onChangeValue?:(event:ChangeEvent<HTMLInputElement>, index:number) => void
    onBackSpace?:(event:React.KeyboardEvent<HTMLInputElement>, index:number) => void
    childred?:React.ReactNode
}


const Input = (
    {type, className,ref,onChangeValue,onBackSpace, index,children, ...props}:InputProps
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
   <input 
   ref={ref}
   type={type} 
   onChange={customOnChangeInput}
   onKeyUp={customOnBackspace}
   className={`border  p-2 my-1 w-full rounded-md 
    ${className || " "}`}
   {...props}
   
   >
    {children}
    </input>
  )
}

export default Input
