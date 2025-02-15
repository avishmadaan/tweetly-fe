"use client"
import BotCard from '@/components/bot-card'
import CreateYourBot from '@/components/create-your-bot'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import { UseAi } from '@/lib/aiContext'
import { Pencil } from 'lucide-react'

import React, { useState } from 'react'



const View = () => {
  const [createBotBox,setCreateBotBox] = useState<boolean>(false);
  const {aiBots} =UseAi();

  return (
    <div className=''>

      <div className="" id="predefined">
<div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-2xl flex items-center gap-2">PreBuilt Bots

          <ToolTip>These are pre built custom bots provided by tweetly.</ToolTip>
        </h2>

        {/* <Button
          className='text-sm'
          startIcon={<Pencil size={16} />}
          variant='primary'
          onClick={() => setCreateBotBox(!createBotBox)}
          >
          Create Your Bot
          </Button> */}
          
          {createBotBox && (

      <CreateYourBot 
      closePopup={setCreateBotBox}
      />
          )}
          </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4 gap-4" id="prebuiltbots">

          {
            aiBots.map((bot, index) => (
              <BotCard
              key={index}
              tooltip={`This bot has been trained on ${bot.name} Twitter Profile`}
              imageURL={bot.imageURL}
              name={bot.name}
              tag={bot.tag}
              xProfile={bot.twitterLink}
              
              />
            ))

          }

        

        </div>


      </div>

{/* Custom Bots */}
      {/* <div className="mt-6" id="Custom Bots">
        <h2 className="font-semibold text-2xl flex items-center gap-2">Custom Bots

          <ToolTip>These are custom bots created by you.</ToolTip>
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4 gap-4" id="custombots">

          <p className="">Coming soon......</p>



        </div>


      </div> */}
     
      
    </div>
  )
}

export default View
