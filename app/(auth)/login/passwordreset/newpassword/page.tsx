"use client"

import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input'
import VisibilityButton from '@/components/ui/visibility-button';
import { useAuth } from '@/lib/authContext';
import { KeyRound } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

type ResetPasswordData = {
    password: string;
    confirmPassword:string
  };

const PasswordReset = () => {
    
    const searchParams  = useSearchParams();

    useEffect(() => {

        setEmail(decodeURIComponent(searchParams.get("email") || "Invalid Email"));
        console.log(searchParams.get("passresettoken"));
        


    }, [])

    const {passwordReset} = useAuth();

    const [email, setEmail] = useState<string>("");

    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<ResetPasswordData>({
        defaultValues: {
          password: '',
          confirmPassword:''
        },
        mode: 'onChange', 
      });

      const [loading, setLoading] = useState<boolean>(false);
      const [isPasswordVisible, setIsPasswordVisible] = useState(false);
      const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

      function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
      }
      function toggleConfirmPasswordVisibility() {
        setIsConfirmPasswordVisible((prevState) => !prevState);
      }

      const onSubmit = async (data: ResetPasswordData) => {

        const token = searchParams.get("passresettoken");

        const newDataWithToken = {
            ...data,
            token: token || " "
        }

        setLoading(true);
       await passwordReset(newDataWithToken)
        setLoading(false);
       
      
      };
    


  return (
    <div className='md:w-[30%] min-w-[350px]'>
         <div className=" p-4 border rounded-md  shadow-[1px_1px_2px_rgba(255,255,255,0.1)]">
            <KeyRound size={60} />

         <h1 className="text-3xl font-bold py-2 ">Enter New Password </h1>
        {/* <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">
          Enter you new password and click on submit
        </p> */}
        <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">
          You are resetting password for <span className='font-bold'>{email}</span>
        </p>

        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-2">


<div className="flex justify-between items-center mt-2">
          <label className="">Password</label>

          </div>
          <div className="relative  ">
          <Input 
          type={isPasswordVisible ? 'text' : 'password'}
          {...register("password", { required: "Password is Required",
            pattern:{
              value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/ ,
              message:"Password must contain atleast one uppercase letter, one lowercase letter, one number, and one special character."
            },
            minLength:{
              value:8,
              message:"Minimum length is 8"
            }
           })}

          />

          <VisibilityButton isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} ></VisibilityButton>

</div>
        

          {errors.password && (
            <span className="text-red-500 text-left text-sm">{errors.password.message}</span>
          )}

<label className="mt-4">Confirm Password</label>
          <div className="relative">
          <Input 
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          {...register("confirmPassword", { required: "Please confirm your password",
            validate: (value)=> 
              value === watch('password') || 'Password do not match'
             })}
             />

<VisibilityButton isPasswordVisible={isConfirmPasswordVisible} togglePasswordVisibility={toggleConfirmPasswordVisibility} ></VisibilityButton>

</div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-left text-sm">{errors.confirmPassword.message}</span>
          )}
        
  
          <Button className="mt-6 w-full text-center py-3" variant={"primary"} type="submit" disabled={!isValid} loading={loading}>
            Change Password
          </Button>


        </form>


         </div>
      
    </div>
  )
}

export default PasswordReset
