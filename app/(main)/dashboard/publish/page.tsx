import PreviewTweet from '@/components/preview-tweet'
import RichTextEditor from '@/components/rich-text-editor'
import SchedulingBar from '@/components/scheduling-bar'
import ToolTip from '@/components/ui/tooltip'
import React from 'react'

const Publish = () => {
  return (
    <div className='flex-grow flex flex-col w-full' id='publish'>

        <div className="flex  items-center gap-2" id="top">

        <h1 className="text-2xl font-semibold">Publish Content</h1>
        <ToolTip>Use the content composer to create, publish, and schedule content on your X Profile.</ToolTip>

        </div>


        <div className="flex flex-col flex-grow justify-between" id="main">



        <div className="flex flex-wrap gap-2 mt-4 w-full overflow-auto" id="contentpreviw">

    <RichTextEditor className="flex-1  overflow-y-auto" />
    <PreviewTweet className="flex-1  overflow-y-auto" />
</div>



        <div className="" id='schedulingbar'>
        <SchedulingBar />

        </div>
        </div>
      
    </div>
  )
}

export default Publish
