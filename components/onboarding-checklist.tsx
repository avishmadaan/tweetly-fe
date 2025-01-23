import React from 'react'
import ToolTip from './ui/tooltip'
import Iframe from 'react-iframe'

const OnboardChecklist = () => {
  return (
    <div className='border p-6 rounded-md  flex-wrap'>
 <div className="flex items-center gap-2" id="top">

<h1 className="text-2xl font-semibold">Onboarding Video</h1>


</div>

<div className=" mt-4 text-lg" id="content">

  

    <div ><Iframe url="https://www.loom.com/embed/5bbdeb480ba84e65b1b3de8c190e2003?sid=b769f1a1-1c1d-4b39-a43b-cdbdccc90b60" width="640px"
        height="320px"
        id=""
        className="bg-white rounded-md"
        display="block"
        position="relative" ></Iframe></div>
</div>

      
    </div>
  )
}

export default OnboardChecklist
