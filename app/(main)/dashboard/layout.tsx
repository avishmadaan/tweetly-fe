"use client"

import AppNavbar from '@/components/app-navbar';


import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {


  return (
    <div className='w-full h-full flex flex-col pb-2 '>
      <AppNavbar />
      
       
        <div id='dashboarditems' className="flex flex-grow p-6 overflow-auto ">

        {children}
        </div>
      
    </div>
  )
}

export default Layout
