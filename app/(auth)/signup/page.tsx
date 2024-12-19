'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import VisibilityButton from '@/components/ui/visibility-button';
import { useAuth } from '@/lib/authContext';

type RegistrationData = {
  email: string;
  password: string;
  confirmPassword:string
};

const Signup = () => {


  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<RegistrationData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword:''
    },
    mode: 'onChange', 
  });

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthenticated, signUp} = useAuth();

  useEffect(() => {
    if(isAuthenticated) {
      router.push("dashboard/home")
    }
  }, [isAuthenticated, router])

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }
  

  const onSubmit = async (data: RegistrationData) => {

    setLoading(true);
    const response = await signUp(data);
    if(!response) {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className=" p-5 border border-opacity-20  rounded-md  md:w-[30%] min-w-[350px] min-h-[70%] flex flex-col shadow-[1px_1px_2px_rgba(255,255,255,0.1)] ">
        <h1 className="text-2xl font-bold  py-2 ">Create an account</h1>
        <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">Enter your email below to create your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-3">
          <label className="">Email</label>
          <Input type='text'
           {...register("email", { required: "Email is Required",
              pattern:{
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
                message: "Please enter a valid email address",
              }
             })} 
            placeholder="m@example.com"

             
             />

          {errors.email && (
            <span className="text-red-500 text-left text-sm">{errors.email.message}</span>
          )}


          <div className="flex justify-between items-center mt-4">
          <label className="">Password</label>
          {/* <p className="">Forgot your password?</p> */}
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
            Signup
          </Button>
        </form>

        <Button className="mt-8 w-full text-center py-2  " variant={"outline"} type="submit" disabled={!isValid}>
            Login with Google
          </Button>
        <span className="text-center block w-full  pt-4 text-sm">
          Already have an account? <Link href={"/login"} className='underline'> Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
