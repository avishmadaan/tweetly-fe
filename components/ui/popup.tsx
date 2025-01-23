"use client"
import React, { useEffect, useRef } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";

const Popup = ({children, className, closePopup}:{
  children:React.ReactNode,
  className?:string,
  closePopup:React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // const handleOutSideClick = (event:MouseEvent) => {

    //   if(popupRef.current && !popupRef.current.contains(event.target as Node)) {
    //     closePopup(val => !val);
    //   }
    // }

    // document.addEventListener("mousedown", handleOutSideClick);

    // return () => {
    //   document.removeEventListener("mousedown", handleOutSideClick);
    // }


  })

  return (
    <div className={`bg-black/80 flex items-center justify-center inset-0 fixed z-40 `}>

      <div ref={popupRef} className={`border rounded-md p-8 w-1/2  bg-white dark:bg-black z-10 drop-shadow-2xl ${className} flex flex-col`} id="inside">

        <IoCloseCircleSharp className='text-black bg-white rounded-full absolute -right-4 -top-2 cursor-pointer' 
        size={28}
        onClick={() => closePopup((val: boolean) => !val)}
        />

       
        {children}
     

      </div>

      
      
    </div>
  )
}

export default Popup
