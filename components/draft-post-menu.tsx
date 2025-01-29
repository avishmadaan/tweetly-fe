"use client"
import { FaEllipsisVertical } from "react-icons/fa6";
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Eye, Trash } from "lucide-react";
import { NavbarItem } from "./ui/navbar-item";
import {  PostsType, UseX } from "@/lib/xContext";
import AreYouSure from "./are-you-sure";
import TweetPreviewPopup from "./tweet-preview-popup";

type menuItems = {
    title: string;
    url: string;
    icon: ReactElement;
  };
  

// Menu items.
const items: menuItems[] = [
  

    {
      title: "Preview Draft",
      url: "/dashbord/publish/editor",
      icon: <Eye size={20} />,
    },

]


const DraftPostMenu = ({id, post}:{id:string, post:PostsType}) => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
     const menuref = useRef<HTMLDivElement>(null);
     const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
     const {deleteDraft} = UseX();
       const [previewPopup, setPreviewPopup] = useState<boolean>(false);
     
       const showPreview = () => {
         setPreviewPopup(true);
       }

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
            onClick={() => {
              showPreview();
              setMenuOpen(false);
            }}
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
            onClick={() => {
              setDeleteConfirm(true);
              setMenuOpen(false);
            }
             }
          />


    </div>
   )

   }

{deleteConfirm && (
        <AreYouSure closePopup={setDeleteConfirm} confirmFunction={() => {deleteDraft(id)}} description="This tweet will be deleted from the database and you will never be able to recover it." className="w-1/3 max-w-[500px]" />
      )}
      
      {previewPopup && (
          <TweetPreviewPopup
          closePopup={setPreviewPopup}
          className=''
          currentPostMedia={post.files}
          currentTweet={post.postContent}
          />
        )}
    </div>
  )
}

export default DraftPostMenu
