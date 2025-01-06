"use client"
import React from 'react'
import { Button } from './ui/button'
import { Clock, NotepadText, Send } from 'lucide-react'
import WhenToPost from './when-to-post'
import { UseX } from '@/lib/xContext'
import ToolTip from './ui/tooltip';
import DateTimePicker from './date-time-picker'


const SchedulingBar = () => {

  const {whenToPost} = UseX();

  return (
    <div className='w-full h-16 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-between p-10 relative'>
      <div className="flex items-center gap-4" id="section1">
        <div className="absolute left-4">
        <ToolTip>Select here when you want to post</ToolTip>
        </div>
      

        
        When to post

       <WhenToPost />
       {whenToPost != "now" && (

         <DateTimePicker />
       )

       }

        
        </div>
      <div className="flex item-center gap-4" id="section2">

        <Button
        startIcon={<NotepadText />}
        variant='outline'
        className=''
        >
          Save as Draft
        </Button>

        {whenToPost == "now"? (
           <Button 
           className='py-1'
           startIcon={<Send />}
           variant='primary' 
           >
             Post Now
   
           </Button>

        ):
        (
          <Button 
          className='py-1'
          startIcon={<Clock />}
          variant='primary' 
          >
            Schedule
  
          </Button>


        )}


       
      </div>
    </div>
  )
}

export default SchedulingBar
