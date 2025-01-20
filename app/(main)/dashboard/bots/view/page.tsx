"use client"
import BotCard from '@/components/bot-card'
import CreateYourBot from '@/components/create-your-bot'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import { Pencil } from 'lucide-react'

import React, { useState } from 'react'



const View = () => {
  const [createBotBox,setCreateBotBox] = useState<boolean>(false);

  return (
    <div className=''>

      <div className="" id="predefined">
<div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-2xl flex items-center gap-2">PreBuilt Bots

          <ToolTip>These are pre built custom bots provided by tweetly.</ToolTip>
        </h2>

        <Button
          className='text-sm'
          startIcon={<Pencil size={16} />}
          variant='primary'
          onClick={() => setCreateBotBox(!createBotBox)}
          >
          Create Your Bot
          </Button>
          
          {createBotBox && (

      <CreateYourBot 
      closePopup={setCreateBotBox}
      />
          )}
          </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4 gap-4" id="prebuiltbots">

        <BotCard
        tooltip='This bot has been trained on Harkirat&apos;s Twitter Profile'
        imageURL='https://i.postimg.cc/qgMRmVxm/Playground-Image4.avif'
        name='Harkirt Singh'
        tag="WebDev Pro"
        xProfile='https://x.com/kirat_tw'
        
        />
        <BotCard
        tooltip='This bot has been trained on Striver&apos;s Twitter Profile'
        imageURL='https://i.postimg.cc/LJDxSNTD/Playground-Image6.avif'
        name='Striver Aka Raj'
        tag="DSA Pro"
        xProfile='https://x.com/striver_79'
        
        />
        <BotCard
        tooltip='This bot has been trained on Harry&apos;s Twitter Profile'
        imageURL='https://i.postimg.cc/5Yf1yxQv/Playground-Image8.avif'
        name='Code With Harry'
        tag="Best Teacher"
        xProfile='https://x.com/codewithharry'
        
        />
        <BotCard
        tooltip='This bot has been trained on EzSnippets&apos;s Twitter Profile'
        imageURL='https://i.postimg.cc/Fk5pbjB6/Playground-Image12.avif'
        name='EzSnippet'
        tag="Build In Public Pro"
        xProfile='https://www.instagram.com/ezsnippet/?hl=en'
        
        />
        

        </div>


      </div>

{/* Custom Bots */}
      <div className="mt-6" id="Custom Bots">
        <h2 className="font-semibold text-2xl flex items-center gap-2">Custom Bots

          <ToolTip>These are custom bots created by you.</ToolTip>
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4 gap-4" id="custombots">

          <p className="">Coming soon......</p>



        </div>


      </div>
     
      
    </div>
  )
}

export default View
