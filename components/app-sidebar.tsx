"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";
import icon_v1_dark from "../assets/iocn_v1_dark.png";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "./ui/navbar-item";
import { ReactElement, useContext, useState } from "react";
import { createContext } from "react";

type menuItems = {
  title: string;
  url: string;
  icon: ReactElement;
};

// Menu items.
const items: menuItems[] = [

  
  {
    title: "Home",
    url: "/dashboard/home",
    icon: <Home />,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: <Inbox />,
  },
  {
    title: "Calendar",
    url: "/dashboard/#",
    icon: <Calendar />,
  },
  {
    title: "Search",
    url: "/dashboard/#",
    icon: <Search />,
  },
  {
    title: "Settings",
    url: "/dashboard/#",
    icon: <Settings />,
  },
];

export function AppSidebar() {
  const pathname = usePathname(); 

  const {open} = useSidebarContext();

  return (
    <div className={` border-r h-screen 
      
    ${open? "w-[20%] min-w-[250px] p-4":"w-[60px] p-1 pt-4" } transition-all duration-250
    
     `}>
      <div
        className="
          "
      >
        <Link href={"/dashboard"} className="flex items-center gap-1 py-2">
        <Image
  src={icon_v1_dark}
  className="w-[50px] cursor-pointer  brightness-0 dark:invert"
  alt="logo"
  width={50}
  height={50}
/>
          {open && (

          <h1 className="text-4xl font-bold">Tweetly</h1>
          )}
        </Link>
      </div>
      

      <div
        className=" mt-5 text-gray-600
          "
        id="menus"
      >
        {items.map((item, index) => {

         
            return (
              <NavbarItem
                name={item.title}
                icon={item.icon}
                key={index}
                url={item.url}
                open={open}
                isActive={pathname === `/dashboard/${item.title.toLowerCase()}`}
              />
            );
    
        })}
      </div>
    

      {/* <Button variant={"primary"} startIcon={<LogOutIcon />} className="absolute bottom-5 left-5 right-5 bg-red-500" >   Logout
    </Button> */}
    </div>
  );
}
// Context
type SidebarContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarContextProvider = ({children}:{children:React.ReactNode}) => {
  const [open, setOpen] = useState<boolean>(true);

  return (<SidebarContext.Provider value={{open, setOpen}}>
    {children}
  </SidebarContext.Provider>

  )

}


export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }
  return context;
};