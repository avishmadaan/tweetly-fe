"use client"
import Image from 'next/image';
import React from 'react'
import { NavbarItem } from './ui/navbar-item';
import { Bot } from 'lucide-react';
import { UseAi } from '@/lib/aiContext';



const BotSelection = () => {
  const {setSelectedBot, aiBots, selectedBot} = UseAi();
  return (
    <div className='border  h-full rounded-md flex flex-col'>
        <div className="border-b p-4 h-16">
        <h1 className="font-semibold  flex gap-2 items-center">
            <Bot />
            Select Your Bot
            </h1>

           
        </div>

        <div className="flex-1 overflow-auto p-2">

       

       {aiBots.map((bot, index) => {
      
                    return (
                      <NavbarItem
                      name={bot.name}
                      key={index}
                      open={true}
                      icon={<Image alt='harkirat' src={bot.imageURL} width={28} height={28} className='rounded-full'/>}
                      url="/"
                      onClick={() => {
                        console.log("bot selected")
                        setSelectedBot(bot);
                      }}
                      className='my-2 mb-4 text-lg'
                      isActive={selectedBot?.id == bot.id}
                      />
      
                    )
                  })}
      </div>
      
    </div>
  )
}

export default BotSelection
