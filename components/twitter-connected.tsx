import { UseAi } from '@/lib/aiContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaXTwitter } from "react-icons/fa6";

const TwitterConnected = () => {

   const { isXIntegrated, Xdata} = UseAi();


  return (
    <Link className='md:block' hidden href={"/dashboard/integrations"}>
    <div className="flex border bg-gray-800 p-2 px-4 rounded-md gap-2 cursor-pointer text-white dark:bg-gray-00 relative items-center h-12">
                {Xdata?.profilePicture ? (
                  <Image
                    src={Xdata?.profilePicture}
                    alt={"profile pic"}
                    width={28}
                    height={28}
                    className="rounded-full "
                  />
                ) : (
                  <FaXTwitter className='' />
                )}
         
    {/* Indicator */}
   

    {/* User Info */}
    {isXIntegrated ? (
      <div className="flex items-center gap-2">
        
        <span className="font-semibold ">@{Xdata?.username}</span>
        <div
      className={`w-3 h-3 rounded-full ${
  isXIntegrated ? "bg-[#1C9AF0] animate-pulse shadow-[0_0_15px_3px_rgba(28,154,240,0.6)]" : ""
}`}
    ></div>
      </div>
    ) : (
      <span className="text-sm"> Account Not Connected</span>
    )}



   
  </div>
  </Link>

      

  )
}

export default TwitterConnected
