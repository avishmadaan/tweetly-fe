"use client"
import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { CircleCheck, CircleX } from 'lucide-react'
import ToolTip from './ui/tooltip';
import { FaXTwitter } from 'react-icons/fa6';
import Input from './ui/input';
import { LiaKeySolid } from "react-icons/lia";

const DevTwitter = () => {
    const [isXIntegrated] = useState<boolean>(true)
      const xClientIdRef = useRef<HTMLInputElement>(null);
      const XClientSecretRef = useRef<HTMLInputElement>(null);

  return (
    <div className='max-w-1/3 border p-6 rounded-md relative flex flex-col min-h-[400px]'>
    <div className="tooltip absolute right-4 ">

    <ToolTip>Enter your Twitter Dev Key. Access it from here <a rel="noopener" className="underline" target="_blank" href="https://developer.x.com/en/portal/dashboard">Access Here</a></ToolTip>

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

 <LiaKeySolid 
 size={100}
 className='my-4' 
 />
 <h1 className="text-2xl font-bold py-2 ">Enter your X Dev Keys</h1>
<p className="flex-wrap dark:text-gray-300 text-gray-500 text-sm pb-4">
Enter your x accounts key here (It stay in your browser only).
</p>

<Input
        ref={xClientIdRef}
        type="text"
        placeholder="Enter Your X Client Id"
        disabled={isXIntegrated}
        className={` ${isXIntegrated && "cursor-not-allowed"}`}
        
      />

<Input
        ref={XClientSecretRef}
        type="text"
        placeholder="Enter Your X Client Secret Here"
        disabled={isXIntegrated}
        className={`mt-2 mb-4 ${isXIntegrated && "cursor-not-allowed"}`}
        
      />


{
    isXIntegrated ? (
        <Button variant='primary' 
        className='bg-red-600
         dark:bg-red-600
        dark:text-white w-full cursor-pointer mt-auto '
    
        >
      <CircleX className='' />  Disconnect 
      {/* <span className="bg-gray-800">
      {"avish.madaan"}
        </span>  */}
    </Button>

    ):
    (
<Button variant='primary' className='flex items-center w-full mt-auto'
>
  <FaXTwitter />  Connect Your Account
</Button>

    )


}


</div>
  )
}

export default DevTwitter
