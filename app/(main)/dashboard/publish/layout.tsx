"use client"

import { NavbarItem } from '@/components/ui/navbar-item';
import { NotepadText, Pencil } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { ReactElement } from 'react'

type menuItems = {
  title: string;
  url: string;
  icon: ReactElement;
};

const items: menuItems[] = [

  
  {
    title: "Editor",
    url: "/dashboard/publish/editor",
    icon: <Pencil />,
  
  },
  {
    title: "Drafts",
    url: "/dashboard/publish/drafts",
    icon: <NotepadText />,
  }
]


const Publish = ({children}:{children:React.ReactNode}) => {
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
        <div className="mt-6 flex-grow w-full" id="chagingpart">
          {children}
        </div>
         
        
      </div>
  )
}

export default Publish
