'use client';

import { useNotification } from '@/components/notification/notificationContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

type RegistrationData = {
  email: string;
  password: string;
};

const Signup = () => {


  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<RegistrationData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange', 
  });

  const router = useRouter();
  const {showNotification} = useNotification();

  const onSubmit = async (data: RegistrationData) => {

    if(isValid) {
      console.log(data);
      reset();
      showNotification({
        message:"Account Creation Success",
        type:"positive"
      })
      router.push("/login")

    }
  };

  return (
    <div className="">
      <div className=" p-5 border border-opacity-20  rounded-md  md:w-[30%] min-w-[350px] min-h-[70%] flex flex-col shadow-[1px_1px_2px_rgba(255,255,255,0.1)] ">
        <h1 className="text-2xl font-bold  py-2 ">Create an account</h1>
        <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">Enter your email below to create your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-3">
          <label className="">Email</label>
          <input
            type="text"
            {...register("email", { required: "Email is Required" })}
            placeholder="m@example.com"
            className="border  p-2 my-1 w-full rounded-md"
          />
          {errors.email && (
            <span className="text-red-500 text-left text-sm">{errors.email.message}</span>
          )}
          <div className="flex justify-between items-center mt-4">
          <label className="">Password</label>
          {/* <p className="">Forgot your password?</p> */}
          </div>
          <input
            type="password"
            {...register("password", { required: "Password is Required" })}
            placeholder=""
            className="border p-2 my-1 w-full rounded-md"
          />
          {errors.password && (
            <span className="text-red-500 text-left text-sm">{errors.password.message}</span>
          )}
          <Button className="mt-6 w-full text-center py-3" variant={"primary"} type="submit" disabled={!isValid}>
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