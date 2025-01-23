import { Bug, CircleUserRound, HelpCircle, Power, UserPen } from 'lucide-react';
import React, { ReactElement } from 'react'
import { NavbarItem } from './ui/navbar-item';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import Image from 'next/image';

type menuItems = {
    title: string;
    url: string;
    icon: ReactElement;
  };
  
  // Menu items.
  const items: menuItems[] = [
  
    
    // {
    //   title: "Profile",
    //   url: "/dashboard/profile",
    //   icon: <UserPen />,
    // },
    
    {
      title: "Help",
      url: "/dashboard/help",
      icon: < HelpCircle/>,
    }

]

const ProfileMenu = () => {

    const pathname = usePathname(); 

    const {logout, user} = useAuth();

  return (
    <div className='border px-4 rounded-md  absolute top-[130%] right-0 w-[250px] bg-white dark:bg-black z-10 shadow-lg' >

      <div className="flex gap-2 py-4 border-b items-center" id="profile">

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

          <CircleUserRound
          size={30}
          
          />

        )}

        <div className="" id="image">

        </div>

        <div className="flex flex-col flex-wrap max-w-100" id="data">
          <p className="font-semibold">{user?.name?.split(" ")[0] || "User"}</p>
        
        <p className="text-[10px]">{user?.email}</p>
        


        </div>


      </div>

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
