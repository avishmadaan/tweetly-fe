import {MessageCircle, Twitter } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ToolTip from './ui/tooltip'
import Link from 'next/link'

type bot = {

    tooltip:string,
    imageURL:string,
    name:string,
    tag:string,
    xProfile:string,
    customBot?:boolean,
    social?:boolean 
  }

const BotCard = (props:bot) => {
  const {social=true} = props;

  return (
      <div className='border rounded-md  p-4 flex flex-col justify-center items-center hover:shadow-md relative'>

        <div className="absolute right-2 top-2 text-center">
        <ToolTip className='text-gray-300'>{props.tooltip} </ToolTip>

        </div>
        <Image
        src={props.imageURL}
        alt={props.name}
        width={80}
        height={80}
        className='rounded-full'
        />

        <h3 className="font-semibold text-xl mt-2 text-center">{props.name}</h3>

        <div className="bg-customBlue text-white px-4 rounded-3xl text-xs mt-1 text-center">{props.tag}</div>

                 {social && (
                  <div className="flex items-center gap-4" id="icons">
         <Link 
         href={props.xProfile}
         target='_blank'
         title='Visit X Profile'
         >
        <Twitter
        size={16}
        className='text-gray-300 mt-4 hover:text-customBlue'

         />

         </Link>

         <Link 
         href={"/dashboard/bots/chat"}
         title='Chat with this bot now'
         >
        <MessageCircle
        size={16}
        className='text-gray-300 mt-4 hover:text-customBlue'

         />

</Link>
        

         </div>


                 )}
         
         
      
    </div>
  )
}

export default BotCard
