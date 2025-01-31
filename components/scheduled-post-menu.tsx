"use client"
import { FaEllipsisVertical } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from 'react'
import {  NotepadText, Pencil, Trash } from "lucide-react";
import { NavbarItem } from "./ui/navbar-item";
import { PostsType, UseX } from "@/lib/xContext";
import AreYouSure from "./are-you-sure";



const SchedulePostMenu = ({ post}:{ post:PostsType}) => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
     const menuref = useRef<HTMLDivElement>(null);
      const [useEditPost, setUseEditPost] = useState<boolean>(false);

     const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
          const {deleteDraft, moveToDraft, usingScheduled, currentPostMedia, currentTweet} = UseX();



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

           const editPost = async (id:string) => {

            if(currentTweet.length>0 || currentPostMedia.length>0 ) {

              setUseEditPost(true);
              return ;
            }

            goAheadEditPost(id);

           }

           const goAheadEditPost = async (id:string) => {
            const value=  await moveToDraft(id);

            if(value){
 
              usingScheduled(id);
 
 
            }


           }


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

            <NavbarItem
            name={"Edit Post"}
            icon={<Pencil size={20} />}
            url={""}
            open={true}
            className='my-2'
            isActive={false}
            onClick={() => {
              editPost(post.id)
            }}
       
          />

          <NavbarItem
            name={"Move To Draft"}
            icon={<NotepadText size={20} />}
            url={""}
            open={true}
            className='my-2'
            isActive={false}
            onClick={() => {
              moveToDraft(post.id);
              setMenuOpen(false);
            }}
       
          />

            <NavbarItem
            name={"Delete Post"}
            icon={< Trash size={20} />}
            url={"/"}
            open={true}
            className='my-2 mt-0 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white cursor-pointer'
            isActive={false}
            onClick={() => {
              setDeleteConfirm(true);
              setMenuOpen(false);
            }}
          />


    </div>
   )

   }

{deleteConfirm && (
        <AreYouSure closePopup={setDeleteConfirm} confirmFunction={() => {deleteDraft(post.id)}} description="This tweet will be deleted from the database and you will never be able to recover it." className="w-1/3 max-w-[500px]" />
      )}

{useEditPost && (
        <AreYouSure closePopup={setUseEditPost} confirmFunction={() => {goAheadEditPost(post.id)}} description="You already have a tweet in your editor, this will override that and show that in editor. If you want you can save that as draft and then use this." className="w-1/3 max-w-[500px]" />
      )}
      
    </div>
  )
}

export default SchedulePostMenu
