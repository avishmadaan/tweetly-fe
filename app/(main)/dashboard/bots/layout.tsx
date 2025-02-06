"use client";

import { NavbarItem } from '@/components/ui/navbar-item';
import {   List, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react';


type menuItems = {
  title: string;
  url: string;
  icon: ReactElement;
};

const items: menuItems[] = [

  
  {
    title: "Your Bots",
    url: "/dashboard/bots/view",
    icon: <List />,
  
  },
  {
    title: "Chat",
    url: "/dashboard/bots/chat",
    icon: <MessageCircle />,
  },
  // {
  //   title: "Training",
  //   url: "/dashboard/bots/training",
  //   icon: <Wrench />,
  // },

]
const Bots = ({children}:{children:React.ReactNode}) => {

    const pathname = usePathname(); 


  

  return (
    <div className='w-full h-full flex flex-col' id='schedule'>

      <div className="border-b pb-4 justify-between  flex items-center  gap-4" id="navigation">

        <div className="flex items-center gap-4" id="leftDiv">

        {items.map((item, index) => (
          <NavbarItem
          className='mt-0'
            name={item.title}
            icon={item.icon}
            key={index}
            url={item.url}
            open={true}
            isActive={pathname.startsWith(item.url)}
          />
        ))}
        </div>

      
         
        


   
      </div>
      <div className="mt-6 flex-1 overflow-auto" id="chagingpart">
        {children}
      </div>
       
      
    </div>
  )
}

export default Bots
