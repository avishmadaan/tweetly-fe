"use client"
import { CircleUserRound } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import ProfileMenu from './profile-menu'
import { useAuth } from '@/lib/authContext'
import Image from 'next/image'

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuref = useRef<HTMLDivElement>(null);

  const {user} = useAuth();

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
    <div ref={menuref} className='flex border bg-gray-100 p-2 rounded-md gap-2 cursor-pointer dark:bg-gray-800 relative items-center h-12 w-12' >
        
        <div className="flex items-center gap-2" onClick={()=> setMenuOpen(!menuOpen)}>
{/* 
        <h2 className="font-semibold">
         Hi, {user?.name?.split(" ")[0] || "User"}
          
        </h2> */}
        {user?.profilePicture ?(
          <div>
        
          <Image
          src={user?.profilePicture}
          alt={"Profile Picutre"}
          width={30}
          className='rounded-full'
          height={30}
          />
          </div>

        ):(

          <CircleUserRound />

        )}
        </div>
        {
          menuOpen && (

            <ProfileMenu />
          )
        }

    </div>
  )
}

export default Profile
