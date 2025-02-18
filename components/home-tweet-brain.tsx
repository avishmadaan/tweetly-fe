import React from 'react'
import ToolTip from './ui/tooltip'
import { UseBrain } from '@/lib/brainContext'

const HomeTweetBrain = () => {
  const {savedCategories,filteredTweets } = UseBrain();
  return (
    <div className='border p-6 rounded-md min-h-72 relative'>

<div className="flex  items-center gap-2 border-b pb-4" id="top">

<h1 className="text-2xl font-semibold">Tweet Brain</h1>
<ToolTip>Number of tweets stored in your brain.</ToolTip>

</div>

<div className="" id="content">
<div className="mt-4" id='schedule'>
        <h2 className='text-6xl text-bold'>{filteredTweets.length}</h2>
        <h3 className='mt-1 dark:text-gray-300  text-lg'>Tweets In Brain</h3>

        <h2 className='text-6xl text-bold mt-2'>{savedCategories.length}</h2>
        <h3 className='mt-1 dark:text-gray-300  text-lg'>Categories In Brain</h3>
        </div>


</div>
      
    </div>
  )
}

export default HomeTweetBrain
