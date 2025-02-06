"use client"
import BotSelection from '@/components/bot-selection'
import ChatWithBot from '@/components/chat-with-bot'
import { Button } from '@/components/ui/button'
import { NavbarItem } from '@/components/ui/navbar-item'
import ToolTip from '@/components/ui/tooltip'
import { Bot, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { ReactElement, useEffect, useRef, useState } from 'react'

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
  }
]

const Chat = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const menuref = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
    
          if(menuref.current && !menuref.current.contains(event.target as Node)) {
            setMenuOpen(false);
          }
    
        }
        document.addEventListener("mousedown",handleClickOutside);
    
        return ()=> {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
      })

  return (
    <div className='flex flex-col h-full overflow-hidden' >
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="font-semibold text-2xl flex items-center gap-2">Test Your Bot

          <ToolTip>You can test this bot here, how they will write the post here and respond to comment.</ToolTip>
        </h2>

        {/* <Button
          className='text-sm'
          endIcon={<ChevronDown size={16} />}
          variant='primary'
          startIcon={<Bot />}
          onClick={() => setMenuOpen(!menuOpen)}
          >
          Select Your Bot
          </Button>
          {menuOpen && (

          <div ref={menuref} className="border px-4 rounded-md  absolute top-[120%] right-0 w-[200px] bg-white dark:bg-black">

            {bots.map((bot, index) => {

              return (
                <NavbarItem
                name={bot.name}
                key={index}
                open={true}
                icon={bot.image}
                url="/"
                onClick={() => console.log("hello")}
                className='my-4 text-md'
                isActive={false}
                />

              )
            })}

          </div>
          )} */}



          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-2  h-full overflow-hidden"  id="chatbox">

          <div className="md:w-1/4 h-full overflow-hidden" id="botSelection">

<BotSelection />

</div>

          <div className="md:w-3/4 h-full overflow-hidden" id="chatbox">
            <ChatWithBot />

            </div>



          

          </div>

    </div>
  )
}

export default Chat
