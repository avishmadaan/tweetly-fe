import React from 'react'
import Popup from './ui/popup'
import ToolTip from './ui/tooltip'
import { WandSparkles } from 'lucide-react'
import PreviewTweet from './preview-tweet'

const TweetlyIntelligencePopup = (
  { className, closePopup, children}:{
    children?:React.ReactNode,
    className?:string,
    closePopup:React.Dispatch<React.SetStateAction<boolean>>,
  
  }
) => {
  return (
    <Popup
    closePopup={closePopup}
    className={`${className} ${"p-[0px] w-[70%] min-h-[70%] flex flex-col"}`}
    >
       <div className="flex  items-center gap-2 p-4 border-b" id="top">
<WandSparkles
className='text-customBlue mr-1'

/>
<h1 className="text-2xl font-semibold">Tweetly Intelligence</h1>
<ToolTip>This section provides you with AI tools that comes with tweetly intelligence.</ToolTip>

</div>

<div className="flex gap-2 items-center mt-4 px-6 my-4 flex-grow" id="content">

  <div className=" p-2 w-1/2 rounded-md h-full" id="left">

    <h2 className="">Select Your Bot:</h2>
    <select className='mt-2 w-full p-2 rounded' title='Select Your Bot' name="Bot Selector" id="botselector">
      <option value="H">Harkirat</option>
      <option value="C" defaultValue={"CWH"}>Code With Harry</option>
    </select>


  </div>

  <div className="w-1/2 p-4 bg-gray-800 rounded-md h-[100%] " id="right">

   <PreviewTweet currentTweet='' currentPostMedia={[]} />
  </div>


</div>
      {children}

    </Popup>
  )
}

export default TweetlyIntelligencePopup
