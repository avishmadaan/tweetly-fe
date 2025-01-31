import Image from 'next/image';
import React, { ReactElement } from 'react'
import BotCard from './bot-card';
import { NavbarItem } from './ui/navbar-item';
import { Bot } from 'lucide-react';

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
  return (
    <div className='border p-4 h-full rounded-md flex flex-col'>
        <div className="">
        <h1 className="font-semibold text-lg flex gap-2 items-center">
            <Bot />
            Select Your Bot
            </h1>

            <hr className='mt-4'/>
        </div>

        <div className="flex-1 overflow-y-auto">

       

       {bots.map((bot, index) => {
      
                    return (
                      <NavbarItem
                      name={bot.name}
                      key={index}
                      open={true}
                      icon={bot.image}
                      url="/"
                      onClick={() => console.log("hello")}
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
