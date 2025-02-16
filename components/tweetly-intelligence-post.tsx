import React from 'react'
import Popup from './ui/popup'
import ToolTip from './ui/tooltip'
import { WandSparkles } from 'lucide-react'
import PreviewTweet from './preview-tweet'
import { Button } from './ui/button'
import { FaRandom } from 'react-icons/fa'
import { UseAi } from '@/lib/aiContext'
import QuickActions from './quick-actions'
import { FaBoltLightning } from "react-icons/fa6";

const TweetlyIntelligencePopup = (
  { className, closePopup, children}:{
    children?:React.ReactNode,
    className?:string,
    closePopup:React.Dispatch<React.SetStateAction<boolean>>,
  
  }
) => {

   const {aiBots, setSelectedBot, selectedBot} =UseAi();
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

  <div className=" p-2 w-[45%]  flex flex-col min-h-full flex-grow" id="left">

    <h2 className="font-semibold">Select Your Bot:</h2>
    <select className='mt-2 w-full p-2 rounded bg-gray-50 dark:bg-gray-800' title='Select Your Bot' name="Bot Selector" id="botselector" 
    defaultValue={selectedBot?.id}
    onChange={
      (e) => {
        console.log(e.target.value)
       setSelectedBot(aiBots.find(bot => bot.id == e.target.value) || null );
      }
      
    }>
      {aiBots.map((bot, index) => (
        <option
        key={index} 
        value={bot.id}
        
        onClick={() => {
          console.log("bot selection")
          setSelectedBot(bot);
        }}
         >
          {bot.name}
        </option>
      ))}

    </select>

    <div className="mt-4" id="inputorRandom">

      <h2 className="font-semibold">Enter Your Thoughts: </h2>
      <textarea className='p-2 w-full mt-2 rounded-md bg-gray-50 dark:bg-gray-800' placeholder='Write a Topic To Tweet On' />

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

  <div className="mt-4 flex flex-wrap gap-4 justify-center items-center  p-3 rounded-md relative" id="ideas">

  <QuickActions  getQuickQuestionReply={(text) => console.log(text)}
  className='text-xs bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300' 
  />

  {/* <FaBoltLightning 
  className='absolute left-0 top-0 bg-gray-200' 
  /> */}
  </div>


</div>

</div>
    </div>



  </div>

  <div className="w-[60%] p-4 dark:bg-gray-800 rounded-md min-h-full " id="right">

   <PreviewTweet currentTweet='' currentPostMedia={[]} />
  </div>


</div>
</div>
      {children}

    </Popup>
  )
}

export default TweetlyIntelligencePopup
