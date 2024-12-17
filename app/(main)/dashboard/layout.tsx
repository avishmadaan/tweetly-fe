"use client"

import { useSidebarContext } from '@/components/app-sidebar';
import SidebarSwitch from '@/components/ui/sidebar-switch'
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
    const { setOpen} = useSidebarContext();
  return (
    <div className='w-full'>
        <div className="relative w-full border-b h-24 flex justify-end items-center px-5" >
        <SidebarSwitch onClick={setOpen} />
        <ThemeSwitcher />
        </div>
        <div className="p-4">

        {children}
        </div>
      
    </div>
  )
}

export default Layout
