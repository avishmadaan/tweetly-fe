"use client"
import { FaEllipsisVertical } from "react-icons/fa6";
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Pencil, Trash } from "lucide-react";
import { NavbarItem } from "./ui/navbar-item";

type menuItems = {
    title: string;
    url: string;
    icon: ReactElement;
  };
  

// Menu items.
const items: menuItems[] = [
  
    
    {
      title: "Use Draft",
      url: "/dashbord/publish/editor",
      icon: <Pencil size={20} />,
    }

]


const DraftPostMenu = () => {

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
    <div className='relative'>
    <FaEllipsisVertical
    title="Draft Post Menu"
   className='cursor-pointer'
   size={20} 
   onClick={() => setMenuOpen(!menuOpen)}
   />

   {menuOpen && (

    <div ref={menuref} className="border px-2 rounded-md  absolute right-full -translate-y-1/2 w-[180px] bg-white dark:bg-black z-10">

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
            name={"Delete Draft"}
            icon={< Trash size={20} />}
            url={"/"}
            open={true}
            className='my-2 mt-0 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white'
            isActive={false}
          />


    </div>
   )

   }
      
    </div>
  )
}

export default DraftPostMenu
