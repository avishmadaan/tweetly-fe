"use client"
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useAuth } from '@/lib/authContext';
import { Link2, MoveLeft } from 'lucide-react';

import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';



type forgotPasswordData = {
    email: string;
  };

const ResetPassword = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const {passwordResetLinkSend} = useAuth();


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
      } = useForm<forgotPasswordData>({
        defaultValues: {
          email: ""
        },
        mode: "onChange",
      });

      const onSubmit = async (data: forgotPasswordData) => {

        console.log(data);
        setLoading(true);
        const result = await passwordResetLinkSend(data);
        // const response = await login(data);
     
        setLoading(false);
        
        if(result) {
            reset()
        }
  
  
    }

  return (
    <div className='md:w-[30%] min-w-[350px]'>
        <div className="  p-4 border rounded-md  shadow-[1px_1px_2px_rgba(255,255,255,0.1)] ">

        <Link href={"/login"} >
    <div className="flex gap-1 items-center cursor-pointer hover:underline">
    <MoveLeft size={18} />
    <p className="text-xs">Back To Login Page</p>
    </div>
    </Link>

    <Link2 size={60} className='mt-4 text-left' />

        <h1 className="text-3xl font-bold py-2 ">Password Reset</h1>
        <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">
          Enter your email below send password reset link.
        </p>
     
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-2">


        <label className="">Email</label>
          <Input
            type="text"
            {...register("email", { required: "Email is Required" })}
            placeholder="m@example.com"
          />
          {errors.email && (
            <span className="text-red-500 text-left text-sm">
              {errors.email.message}
            </span>
          )}

<Button
            className="mt-6 w-full text-center py-3"
            variant={"primary"}
            type="submit"
            disabled={!isValid}
            loading={loading}
          >
            Send Password Reset Link
          </Button>
            </form>


        </div>
      
    </div>
  )
}

export default ResetPassword
