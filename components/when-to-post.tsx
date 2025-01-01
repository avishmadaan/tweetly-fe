"use client"
import { UseX } from '@/lib/xContext'
import { ChevronDown, ChevronUp, Clock, Send } from 'lucide-react';
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { NavbarItem } from './ui/navbar-item';

type menuItems = {
    title: string;
    url: string;
    icon: ReactElement;
    type:"now"| "schedule"
  };
  
  // Menu items.
  const items: menuItems[] = [
  
    
    {
      title: "Schedule",
      url: "/dashboard/billing",
      icon: < Clock/>,
      type:"schedule"
    },
    {
        title: "Post Now",
        url: "/dashboard/profile",
        icon: <Send />,
        type:"now"
      },

]


const WhenToPost = () => {

    const {whenToPost, setWhenToPost} = UseX();
    const [postingMenu, setPostingMenu] = useState<boolean>(false);
    const menuref = useRef<HTMLDivElement>(null);


      useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
          if(menuref.current && !menuref.current.contains(event.target as Node)) {
            setPostingMenu(false);
          }
        }

        document.addEventListener("mousedown",handleClickOutside);
    
        return ()=> {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
      },[])




  return (
    <div ref={menuref} 
    className='border p-4 rounded flex items-center  gap-2 relative cursor-pointer'  
    onClick={()=> setPostingMenu(!postingMenu)}
    >

        {whenToPost == "now"?"Post Now":"Schedule"}

        

{postingMenu?(<ChevronUp />):(<ChevronDown />)}
        

        {
          postingMenu && (

            <div className=" border p-2 rounded-md gap-2 bg-white  dark:bg-gray-800 absolute left-0 bottom-[120%] w-[120%] items-center z-10 "
            
            >

                {items.map((item, index) => {
                
                         
                return (
                  <NavbarItem
                  className='my-4'
                    name={item.title}
                    icon={item.icon}
                    key={index}
                    url={item.url}
                    open={true}
                    onClick={() => setWhenToPost(item.type)}
                    isActive={false}
                  />
                );
                
                })}



            </div>
          )
        }


      
    </div>
  )
}

export default WhenToPost
