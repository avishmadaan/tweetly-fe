import React from 'react'
import Popup from './ui/popup'
import ToolTip from './ui/tooltip'
import { WandSparkles } from 'lucide-react'
import PreviewTweet from './preview-tweet'
import Input from './ui/input'
import { Button } from './ui/button'
import { FaRandom } from 'react-icons/fa'

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

      <div className="flex flex-col flex-grow h-full" id='top'>
       <div className="flex  items-center gap-2 p-4 border-b" id="top">
<WandSparkles
className='text-customBlue mr-1'

/>
<h1 className="text-2xl font-semibold">Tweetly Intelligence</h1>
<ToolTip>This section provides you with AI tools that comes with tweetly intelligence.</ToolTip>

</div>

<div className="flex h-full gap-2 mt-4 px-6 my-4 flex-grow " id="content">

  <div className=" p-2 w-1/2  flex flex-col h-full flex-grow" id="left">

    <h2 className="font-semibold">Select Your Bot:</h2>
    <select className='mt-2 w-full p-2 rounded' title='Select Your Bot' name="Bot Selector" id="botselector">
      <option value="C" >Code With Harry</option>
      <option value="H">Harkirat</option>
    </select>

    <div className="mt-4" id="inputorRandom">

      <h2 className="">Enter Your Thoughts </h2>
      <textarea className='p-2 w-full mt-2 rounded-md' placeholder='Write a Topic To Tweet On' />

      <div className='mt-2'>

<div className="flex items-center">
    <hr className='w-1/2' />
    <p className="px-3">OR</p>
    <hr className='w-1/2' />

</div>

<div className="" >
  

        <Button className="mt-4 w-full text-center py-2 flex gap-4 "variant={"outline"} type="button"  
        
        >
        
        <FaRandom
        size={16}
        
        />
    Generate High Engagment Tweet
  </Button>

</div>

</div>
    </div>



  </div>

  <div className="w-1/2 p-4 bg-gray-800 rounded-md h-full " id="right">

   <PreviewTweet currentTweet='' currentPostMedia={[]} />
  </div>


</div>
</div>
      {children}

    </Popup>
  )
}

export default TweetlyIntelligencePopup
