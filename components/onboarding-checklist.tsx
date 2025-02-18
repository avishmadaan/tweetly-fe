import React from 'react'
import ToolTip from './ui/tooltip'
import Iframe from 'react-iframe'
import Link from 'next/link'

const OnboardChecklist = () => {
  return (
    <div className='border p-6 rounded-md  flex-wrap w-1/2'>
 <div className=" items-center gap-2" id="top">

<h1 className="text-2xl font-semibold">Onboarding</h1>
<p className="mt-2 text-gray-500 dark:text-white">Watch this video to get started with tweetly.</p>


</div>

<div className=" mt-4 text-lg relative aspect-video" id="content">

  
      <Iframe url="https://www.loom.com/embed/5bbdeb480ba84e65b1b3de8c190e2003?sid=b769f1a1-1c1d-4b39-a43b-cdbdccc90b60" 
        id=""
        className="bg-white rounded-md absolue top-0 left-0 w-full h-full"
        display="block"
        position="relative" ></Iframe>
</div>

<div className="p-4 mt-4">

  <p className="text-xl">Step 1: Integrate Your Twitter Profile In 
    <Link href={"/dashboard/integrations"} className='text-customBlue' >  Integration Tab.
    </Link> </p>

    <p className="text-xl mt-4">Step 2: Enter Your OpenAi API keys for Bots  <Link href={"/dashboard/integrations"} className='text-customBlue' > Here.
    </Link></p>
</div>

      
    </div>
  )
}

export default OnboardChecklist
