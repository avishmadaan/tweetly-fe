import { CircleX } from 'lucide-react'
import React from 'react'

const Popup = () => {
  return (
    <div className='border rounded-md w-[450px] h-[450px] relative p-4'>
        <CircleX className='absolute -right-3 -top-2 cursor-pointer' size={20}/>

        <div className="">
        Popup Content
        </div>
      
      
    </div>
  )
}

export default Popup
