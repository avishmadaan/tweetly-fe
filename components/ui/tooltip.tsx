"use client"
import {  Info } from 'lucide-react'
import React, { useState } from 'react'

const ToolTip = ({children, className}:{children:React.ReactNode, className?:string}) => {
    const [visible, setVisible] = useState<boolean>(false);


  return (
    <div className='relative ' 
    onMouseEnter={() => setVisible(true)}
    onMouseLeave={() =>  setVisible(false)}>

<Info size={18} 
strokeWidth={2}
className={`text-gray-400 cursor-pointer ${className} `} 
/>
   
{ visible && (

<div className="border p-2 rounded-md bg-gray-800 text-white text-sm absolute z-10 shadow-md  w-80 left-full -translate-y-1/2">
    {children}
</div>
)

}


      
    </div>
  )
}

export default ToolTip
