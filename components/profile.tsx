"use client"
import { CircleUserRound } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import ProfileMenu from './profile-menu'

const Profile = () => {
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

  })
  return (
    <div ref={menuref} className='flex bg-gray-100 p-2 rounded-md gap-2 cursor-pointer dark:bg-gray-800 relative'>
        
        <div className="flex gap-2" onClick={()=> setMenuOpen(!menuOpen)}>

        <h2 className="font-normal">Avish M.</h2>
        <CircleUserRound />
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
