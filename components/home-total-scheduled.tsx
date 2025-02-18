import React from 'react'
import ToolTip from './ui/tooltip'
import { UseX } from '@/lib/xContext'

const PostsCount = () => {
  const {draftPosts} = UseX();

  return (
    <div className='border p-6 rounded-md min-h-72 relative h-full'>

<div className="flex  items-center gap-2 border-b pb-4" id="top">

<h1 className="text-2xl font-semibold">Analytics</h1>
<ToolTip>This section will show the checklist you need to follow when getting onbaording.</ToolTip>

</div>



        <div className="mt-4" id=''>
        <h2 className='text-6xl text-bold'>23</h2>
        <h3 className='mt-1  dark:text-gray-300  text-lg'>Total Post Scheduled</h3>
        </div>

        <div className="mt-4" id=''>
        <h2 className='text-6xl text-bold'>{draftPosts.length}</h2>
        <h3 className='mt-1 dark:text-gray-300  text-lg'>In Drafts</h3>
        </div>


        <div className="mt-4" id=''>
        <h2 className='text-6xl text-bold'>120</h2>
        <h3 className='mt-1 dark:text-gray-300  text-lg'>Published</h3>
        </div>



      

       

      
    </div>
  )
}

export default PostsCount
