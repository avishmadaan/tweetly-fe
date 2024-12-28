"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState }  from 'react'
import otp from "../../../../assets/otp.svg"
import { Button } from '@/components/ui/button'
import OtpBox from '@/components/otp-box'
import Link from 'next/link'
import { MoveLeft, RefreshCcw } from 'lucide-react'
import {  useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/authContext'


const OtpVerification = () => {

    const searchParams  = useSearchParams();
    const email = searchParams.get("email");
    const decodedEmail = decodeURIComponent(email || "");
    const [loading, setLoading] = useState<boolean>(false);
    const [reOTP, setReOTP] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);

    const {otpVerfication, reSendOtp} = useAuth();
    const otpBoxRef = useRef<{ validateOTP: () => {inValid :boolean,  otp: string } }>(null);

    useEffect(() => {

        const interval = setInterval(() => {
            setTimer(val =>  val-1)
        }, 1000)

        return () => {
            clearInterval(interval)
        }

    }, [])


    const onSubmit = async () => {
        console.log("submit")
        setLoading(true)
        const {inValid, otp} = otpBoxRef.current?.validateOTP() || { inValid: false, otp: "" };

        if(inValid) {

          await  otpVerfication({
                email:decodedEmail,
                otp:otp
            });

        }

        setLoading(false)

    }

    const reSendOtpInternal = async () => {
        setReOTP(true);
       await reSendOtp(decodedEmail);
       setReOTP(false)
        setTimer(30);
    }

    


    

  return (
    <div className='md:w-[30%] min-w-[350px]'>

      <div className=" p-4 border rounded-md  shadow-[1px_1px_2px_rgba(255,255,255,0.1)]  ">
    <Link href={"/signup"} >
    <div className="flex gap-1 items-center cursor-pointer hover:underline">
    <MoveLeft size={18} />
    <p className="text-xs">Back To SignUp Page</p>
    </div>
    </Link>

      <Image 
      className='invert dark:invert-0 w-52 h-20 pl-0  -ml-2'
      src={otp}
      alt='OTP'
      />
    <h1 className="text-3xl font-bold mb-2 ">OTP Verification</h1>



      <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">Thank you for registering with you. Please type the OTP as shared on your email  <br/>
        <span className='font-bold '>{decodedEmail}</span> </p>

      <div className="my-0">
      <OtpBox otpLength={4} ref={otpBoxRef} />

      </div>


      <Button type='submit' variant='primary' className='mt-4 w-full' loading={loading} onClick={onSubmit} >
        Verify OTP
      </Button>

      <span className="text-center w-full  pt-4 text-sm  flex gap-2 justify-center items-center">
          OTP not received?
          {timer>0 ? (
            <span className=''> Resend in {timer}s
                </span>
          ):(
            
           <span className="">

<RefreshCcw onClick={reSendOtpInternal} className={`cursor-pointer ${reOTP?"animate-spin":""}`} size={18} />

           </span>


           
          )

          }
           
        

           
          
           
        </span>

     
        </div>
    </div>
  )
}

export default OtpVerification
