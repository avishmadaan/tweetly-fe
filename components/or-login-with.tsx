"use client"
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import googleIcon from "../assets/google-logo.svg"
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useNotification } from './notification/notificationContext'


const OrLoginWith = () => {

    const router = useRouter();
    const {showNotification}= useNotification();



    useEffect(() => {
        const eventOnMessage = (event:MessageEvent) => {
            // Ignore messages from any other origin
            if (event.origin !== "http://localhost:4000") {
                return;  
            }
            const {success, message}= event.data || {}
    
                if(success) {
                    console.log("login success")
                    router.push("/dashboard/home");
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
             
                }
    
        }
        window.addEventListener("message",eventOnMessage)

        return () => {
            window.removeEventListener("message", eventOnMessage)
        }


    }, [])

    const openLoginGooglePopup = () => {

        const googleLoginUrl = "http://localhost:4000/api/v1/user/google";

       window.open(
            googleLoginUrl,
             "googleLoginPopup",
            "width=500,height=600"
        )
        
    }

  return (
    <div className='mt-2'>

        <div className="flex items-center">
            <hr className='w-1/2' />
            <p className="px-3">OR</p>
            <hr className='w-1/2' />

        </div>

        <div className="" >
          

                <Button className="mt-4 w-full text-center py-2 flex gap-4 "variant={"outline"} type="button"  
                onClick={openLoginGooglePopup}
                >
                
                <Image
                src={googleIcon}
                alt='Google Icon'
                />
            Login with Google
          </Button>
       
        </div>
      
    </div>
  )
}

export default OrLoginWith
