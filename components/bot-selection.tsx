"use client"
import Image from 'next/image';
import React, { ReactElement } from 'react'
import { NavbarItem } from './ui/navbar-item';
import { Bot } from 'lucide-react';
import { UseAi } from '@/lib/aiContext';

type bot = {
  image: ReactElement;
  name: string;
  };

const bots:bot[] = [

  {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/qgMRmVxm/Playground-Image4.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Harkirat singh"
  },
  {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/LJDxSNTD/Playground-Image6.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Striver Aka Raj"
  }, {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/qgMRmVxm/Playground-Image4.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Harkirat singh"
  },
  {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/LJDxSNTD/Playground-Image6.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Striver Aka Raj"
  }, {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/qgMRmVxm/Playground-Image4.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Harkirat singh"
  },
  {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/LJDxSNTD/Playground-Image6.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Striver Aka Raj"
  }, {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/qgMRmVxm/Playground-Image4.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Harkirat singh"
  },
  {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/LJDxSNTD/Playground-Image6.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Striver Aka Raj"
  }, {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/qgMRmVxm/Playground-Image4.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Harkirat singh"
  },
  {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/LJDxSNTD/Playground-Image6.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Striver Aka Raj"
  }, {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/qgMRmVxm/Playground-Image4.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Harkirat singh"
  },
  {
    image:<Image alt='harkirat' src={"https://i.postimg.cc/LJDxSNTD/Playground-Image6.avif"} width={28} height={28} className='rounded-full'/>,
    name:"Striver Aka Raj"
  }
]

const BotSelection = () => {
  const {setSelectedBot} = UseAi();
  return (
    <div className='border  h-full rounded-md flex flex-col'>
        <div className="border-b p-4 h-16">
        <h1 className="font-semibold  flex gap-2 items-center">
            <Bot />
            Select Your Bot
            </h1>

           
        </div>

        <div className="flex-1 overflow-auto">

       

       {bots.map((bot, index) => {
      
                    return (
                      <NavbarItem
                      name={bot.name}
                      key={index}
                      open={true}
                      icon={bot.image}
                      url="/"
                      onClick={() => {
                        console.log("bot selected")
                        setSelectedBot(bot);
                      }}
                      className='my-4 text-lg'
                      isActive={false}
                      />
      
                    )
                  })}
      </div>
      
    </div>
  )
}

export default BotSelection
