import { CircleHelp, Power, Settings } from 'lucide-react';
import React, { ReactElement } from 'react'
import { NavbarItem } from './ui/navbar-item';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';

type menuItems = {
    title: string;
    url: string;
    icon: ReactElement;
  };
  
  // Menu items.
  const items: menuItems[] = [
  
    
    {
      title: "Settings",
      url: "/dashboard/profile",
      icon: <Settings />,
    },
    
    {
      title: "FAQ",
      url: "/dashboard/billing",
      icon: < CircleHelp/>,
    }

]

const ProfileMenu = () => {

    const pathname = usePathname(); 

    const {logout} = useAuth();

  return (
    <div className='border px-4 rounded-md  absolute top-[130%] right-0 w-[150%] bg-white dark:bg-black'>

{items.map((item, index) => {

         
return (
  <NavbarItem
    name={item.title}
    icon={item.icon}
    key={index}
    url={item.url}
    open={true}
    isActive={pathname === `/dashboard/${item.title.toLowerCase()}`}
  />
);

})}
  <NavbarItem
    name={"Logout"}
    icon={<Power />}
    open={true}
    url='/'
    isActive={false}
    onClick={logout}
    className='hover:bg-red-500 dark:hover:bg-red-500 hover:text-white'
  />
      
    </div>
  )
}

export default ProfileMenu
