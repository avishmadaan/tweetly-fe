"use client";
import {
  Bot,
  Brain,

  Calendar1Icon,
  CircleX,
  Home,
  Send,
  Settings,
} from "lucide-react";
import icon_v1_dark from "../assets/iocn_v1_dark.png";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "./ui/navbar-item";
import { ReactElement, useContext, useEffect, useState } from "react";
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
    title: "Schedule",
    url: "/dashboard/schedule/view",
    icon: <Calendar1Icon />,
  },
  {
    title: "Publish",
    url: "/dashboard/publish",
    icon: <Send />,
  },
  {
    title: "AI Brain",
    url: "/dashboard/brain",
    icon: <Brain />,
  },
  {
    title: "Bots",
    url: "/dashboard/bots/view",
    icon: <Bot />,
  },
  {
    title: "Integrations",
    url: "/dashboard/integrations",
    icon: <Settings />,
  },
  // {
  //   title: "Settings",
  //   url: "/dashboard/#",
  //   icon: <Settings />,
  // },
];

export function AppSidebar() {
  const pathname = usePathname(); 

  const {open, setOpen} = useSidebarContext();

  return (
    <div className={`absolute md:static border-r h-full overflow-auto  z-10 dark:bg-black bg-white
      
    ${open? "md:min-w-[250px] md:w-[250px] p-4 w-full":"md:w-[60px] -translate-x-full md:translate-x-0 p-1 pt-4" } transition-all duration-400 ease-in-out
    
     `}>
      <div
        className="flex justify-between items-center
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

          <h1 className="text-4xl font-bold cursor-pointer">Tweetly</h1>
          )}
        </Link>

        <CircleX size={28} className="md:hidden block" onClick={()=> setOpen((val) => !val)} />
      </div>
      

      <div
        className=" mt-5 text-gray-600
          "
        id="menus"
      >
{items.map((item, index) => (
  <NavbarItem
  className="my-4"
    name={item.title}
    icon={item.icon}
    key={index}
    url={item.url}
    open={open}
    isActive={pathname.startsWith(item.url)}
  />
))}
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

  useEffect(() => {
    // Check screen size when the component is mounted
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false); // Close sidebar on mobile screens (width < 768px)
      } else {
        setOpen(true); // Open sidebar on larger screens
      }
    };

     // Run on mount and resize
     handleResize();
     window.addEventListener("resize", handleResize);

  }, []);

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