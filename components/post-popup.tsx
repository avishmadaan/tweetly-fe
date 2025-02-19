"use client"
import React from 'react'
import Popup from './ui/popup'
import PreviewTweet from './preview-tweet'
import { UseX } from '@/lib/xContext'
import { Button } from './ui/button'
import { Clock, Eye, Send } from 'lucide-react'
import ToolTip from './ui/tooltip'

const PostPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {currentTweet, currentPostMedia, whenToPost,currentPostTime, publishingTweetToTwitter }= UseX();

  return (
    <Popup
    closePopup={closePopup}
    className={` ${"p-[0px] w-[40%] min-h-[70%] flex"}`}
    >
      <div className="flex flex-col flex-grow h-full " id="toplevel">

      <div className="flex  items-center gap-2 p-4 border-b " id="top">
<Eye
className='text-customBlue mr-1'

/>
<h1 className="text-2xl font-semibold">Post Review</h1>
<ToolTip>This is where you can review the post one more last time and schedule or publish.</ToolTip>

</div>
  <div className="flex gap-2 max-h-1/2" id="2sections">



  <PreviewTweet currentPostMedia={currentPostMedia} currentTweet={currentTweet} className='rounded-none' previewClaim={false} />

</div>

      </div>


      <div className="border-t p-4 mt-auto flex gap-4 items-center justify-between" id="bottom">

        <div className="flex  gap-2" id="time">

          <Clock  />
          {whenToPost == "now"? (
            <p className="text-lg">Now</p>
          ):(
            <p className="text-lg"> {currentPostTime?.toString()}</p>

          )}
          <p className=""></p>


        </div>

        <div className="" id="buttons">
        {whenToPost == "now"? (
           <Button 
           className='py-1'
           startIcon={<Send />}
           variant='primary' 
           onClick={publishingTweetToTwitter}
      
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

     
    

        </Popup>
  )
}

export default PostPopup
