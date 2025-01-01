import React from 'react';
import Profile from '@/components/profile';
import TwitterConnected from '@/components/twitter-connected';
import SidebarSwitch from '@/components/ui/sidebar-switch'
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import {  usePathname } from 'next/navigation';
import { useSidebarContext } from '@/components/app-sidebar';

const AppNavbar = () => {

    const { setOpen} = useSidebarContext();

    const pathName = usePathname()

  return (
    <div className="relative w-full border-b h-28  flex justify-between items-center px-5 flex-none" >
        <div className="flex gap-4 items-center">

    <SidebarSwitch onClick={setOpen} />

   <h1 className="text-2xl font-semibold">{
   pathName.split("/")[2].slice(0,1).toUpperCase() + pathName.split("/")[2].slice(1, pathName.split("/")[2].length)
   
   }</h1>

        </div>

        <div className="flex gap-4 items-center">

    <TwitterConnected />
    <ThemeSwitcher />
    <Profile />
            
        </div>
    

    </div>
  )
}

export default AppNavbar
