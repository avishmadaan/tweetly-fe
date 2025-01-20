import React from 'react'
import ToolTip from './ui/tooltip'

const HomeTweetBrain = () => {
  return (
    <div className='border p-6 rounded-md min-h-72 relative'>

<div className="flex  items-center gap-2 border-b pb-4" id="top">

<h1 className="text-2xl font-semibold">Tweet Brain</h1>
<ToolTip>Number of tweets stored in your brain.</ToolTip>

</div>

<div className="" id="content">
<div className="mt-4" id='schedule'>
        <h2 className='text-6xl text-bold'>309</h2>
        <h3 className='mt-1 dark:text-gray-300  text-lg'>Tweets In Brain</h3>
        </div>


</div>
      
    </div>
  )
}

export default HomeTweetBrain
