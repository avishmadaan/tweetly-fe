"use client"

import React, { useEffect } from 'react'
import { Button } from './ui/button'
import {  CircleCheck, CircleX } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { UseAi } from '@/lib/aiContext';
import { useNotification } from './notification/notificationContext';
import ToolTip from './ui/tooltip';

const TwitterIntegration = () => {

  const {integrateX, getXDetails, isXIntegrated, logOutXAccount} = UseAi();
  const {showNotification} = useNotification();



    useEffect(() => {

      const eventOnMessage = async (event:MessageEvent) => {
        if (event.origin !== "http://localhost:4000") {
          return;  
      }

      const {login, message}= event.data || {}

      if(login) {
        console.log("login success")
        await getXDetails();
        showNotification({
            message:message,
            type:"positive"
        })
    }
    else {
        console.log("Error while login");
        showNotification({
            message:"Error While Trying",
            type:"negative"
        })
 
    } }

    window.addEventListener("message",eventOnMessage)

    return () => {
        window.removeEventListener("message", eventOnMessage)
    }

     



    }, [])
  return (
    <div className='max-w-1/3 border p-6 rounded-md relative flex flex-col min-h-[400px]'>
            <div className="tooltip absolute right-4 ">

<ToolTip>Integrate your X (formally twitter) account here</ToolTip>

</div>
        <div className="flex gap-2 items-center text-customBlue"> 
          {isXIntegrated ? (
          <p className="flex gap-2 items-center text-customBlue">
            <CircleCheck className="" size={20} />
          Connected Successfully
          </p>
        ) : (
          <div className="flex gap-2 items-center text-red-500">
            <CircleX className="" size={20} />
            Not Connected
          </div>
        )}</div>
         <FaXTwitter 
         size={100}
         className='my-4' 
         />
         <h1 className="text-2xl font-bold py-2 ">Integrate Your X Profile</h1>
        <p className="flex-wrap dark:text-gray-300 text-gray-500 text-sm pb-4">
        Connect your X (formerly Twitter) account to enable seamless automation for tasks like posting tweets, scheduling updates, and monitoring activity.
        </p>

       

        {
            isXIntegrated ? (
                <Button variant='primary' 
                className='bg-red-500
                 dark:!bg-red-500
                dark:text-white w-full cursor-pointer mt-auto '
                onClick={logOutXAccount}
                >
              <CircleX className='' />  Disconnect 
              {/* <span className="bg-gray-800">
              {"avish.madaan"}
                </span>  */}
            </Button>

            ):
            (
        <Button variant='primary' className='flex items-center w-full mt-auto'
        onClick={integrateX}>
          <FaXTwitter />  Connect Your Account
        </Button>

            )


        }

      
    </div>
  )
}

export default TwitterIntegration
