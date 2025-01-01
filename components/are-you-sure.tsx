
import React from 'react'
import { Button } from './ui/button'
import Popup from './ui/popup'

const AreYouSure = ({ className, closePopup, confirmFunction, description}:{
  children?:React.ReactNode,
  className?:string,
  closePopup:React.Dispatch<React.SetStateAction<boolean>>,
  confirmFunction:() => void,
  description:string
}) => {
  return (

    <Popup
    closePopup={closePopup}
    className={className}
    >

<h1 className="text-3xl font-bold text-gray-600 dark:text-white">Are You Sure?</h1>
    <p className="mt-2 text-gray-500">{description}</p>

    <div className="button flex items-center justify-end gap-4 mt-8">
        <Button variant='primary'
        onClick={() => closePopup(val =>!val)}
        
        >No
        </Button>
        <Button variant='primary' className='bg-red-500  dark:text-white dark:bg-red-500'
        onClick={() => {
            confirmFunction();
            closePopup(val => !val);
        }}
        
        >Yes, Clear It
        </Button>
    </div>


    </Popup>

    
  )
}

export default AreYouSure
