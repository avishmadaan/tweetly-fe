"use client"
import { NavbarItem } from '@/components/ui/navbar-item'

import {  Brain, FileSearch } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { ReactElement } from 'react'
import { BiCategory } from "react-icons/bi";

type menuItems = {
  title: string;
  url: string;
  icon: ReactElement;
};

const items: menuItems[] = [

  
  {
    title: "View",
    url: "/dashboard/brain/view",
    icon: <Brain />,
  
  },
  {
    title: "Categories",
    url: "/dashboard/brain/categories",
    icon: <BiCategory size={24}/>,
  }
  ,
  {
    title: "Ai Search",
    url: "/dashboard/brain/aisearch",
    icon: <FileSearch size={24}/>,
  }

]


const YourBrain = ({children}:{children:React.ReactNode}) => {

  const pathname = usePathname(); 


  return (
   <div className='w-full h-full' id='schedule'>
   
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
         <div className="mt-6 h-full w-full" id="chagingpart">
           {children}
         </div>
          
         
       </div>
  )
}

export default YourBrain
