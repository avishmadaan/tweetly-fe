"use client"
import { FaEllipsisVertical } from "react-icons/fa6";
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Eye, NotepadText, Pencil, Trash } from "lucide-react";
import { NavbarItem } from "./ui/navbar-item";

type menuItems = {
    title: string;
    url: string;
    icon: ReactElement;
  };
  

// Menu items.
const items: menuItems[] = [
  
    
    {
      title: "Edit Post",
      url: "/dashbord/publish/editor",
      icon: <Pencil size={20} />,
    },
    {
      title: "Move To Draft",
      url: "/dashbord/publish/editor",
      icon: <NotepadText size={20} />,
    },

    {
      title: "Preview ",
      url: "/dashbord/publish/editor",
      icon: <Eye size={20} />,
    },

]


const SchedulePostMenu = () => {

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
         
           },[])


  return (
    <div className='relative' ref={menuref}>
    <FaEllipsisVertical
    title="Draft Post Menu"
   className='cursor-pointer'
   size={20} 
   onClick={() => setMenuOpen(val => !val )}
   />

   {menuOpen && (

    <div className="border px-2 rounded-md  absolute right-full -translate-y-1/2 w-[180px] bg-white dark:bg-black z-10">

        {items.map((item, index) => (
            
      
          <NavbarItem
            name={item.title}
            icon={item.icon}
            key={index}
            url={item.url}
            open={true}
            className='my-2'
            isActive={false}
          />
        )
        
        )}

            <NavbarItem
            name={"Delete Post"}
            icon={< Trash size={20} />}
            url={"/"}
            open={true}
            className='my-2 mt-0 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white cursor-pointer'
            isActive={false}
          />


    </div>
   )

   }
      
    </div>
  )
}

export default SchedulePostMenu
