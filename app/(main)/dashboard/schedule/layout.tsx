"use client";
import { NavbarItem } from '@/components/ui/navbar-item';
import { Calendar1Icon, List } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react';

type menuItems = {
  title: string;
  url: string;
  icon: ReactElement;
};

const items: menuItems[] = [

  
  {
    title: "Calendar View",
    url: "/dashboard/schedule/view",
    icon: <Calendar1Icon />,
  
  },
  {
    title: "List View",
    url: "/dashboard/schedule/list",
    icon: <List />,
  },

]
const Schedule = ({children}:{children:React.ReactNode}) => {

    const pathname = usePathname(); 

  

  return (
    <div className='w-full h-full' id='schedule'>

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
      <div className="mt-10 h-full w-full" id="chagingpart">
        {children}
      </div>
       
      
    </div>
  )
}

export default Schedule
