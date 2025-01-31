"use client";
import { NavbarItem } from '@/components/ui/navbar-item';
import {  CalendarCheck2, CircleCheckBig } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react';

type menuItems = {
  title: string;
  url: string;
  icon: ReactElement;
};

const items: menuItems[] = [

  
  // {
  //   title: "Calendar View",
  //   url: "/dashboard/schedule/view",
  //   icon: <Calendar1Icon />,
  
  // },
  {
    title: "Scheduled Posts",
    url: "/dashboard/schedule/list",
    icon: <CalendarCheck2 />,
  },

  {
    title: "Posted",
    url: "/dashboard/schedule/posted",
    icon: <CircleCheckBig />,
  },

]
const Schedule = ({children}:{children:React.ReactNode}) => {

    const pathname = usePathname(); 

  

  return (
    <div className='w-full h-full flex flex-col' id='schedule'>

      <div className="border-b h-16 pb-6 flex items-center  gap-4" id="navigation">

        {items.map((item, index) => (
          <NavbarItem
            name={item.title}
            icon={item.icon}
            key={index}
            url={item.url}
            open={true}
            isActive={pathname.startsWith(item.url)}
          />
        ))}

   
      </div>
      <div className="mt-6 w-full h-full flex-grow"  id="chagingpartt">
        {children}
      </div>
       
      
    </div>
  )
}

export default Schedule
