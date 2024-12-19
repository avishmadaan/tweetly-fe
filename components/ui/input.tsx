
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type:string,
    className?:string;
}

const Input = (
    {type, className, ...props}:InputProps
) => {
  return (
   <input 
   type={type} 
   className={`border  p-2 my-1 w-full rounded-md ${className || " "}`}
   {...props}
   />
  )
}

export default Input
