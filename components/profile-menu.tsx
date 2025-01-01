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
    <div className='border px-4 rounded-md  absolute top-[130%] right-0 w-[160px] bg-white dark:bg-black z-10'>

{items.map((item, index) => {

         
return (
  <NavbarItem
    name={item.title}
    icon={item.icon}
    key={index}
    url={item.url}
    open={true}
    className='my-4'
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
    className='hover:bg-red-500 dark:hover:bg-red-500 hover:text-white my-4 '
  />
      
    </div>
  )
}

export default ProfileMenu
