"use client";

import OrLoginWith from "@/components/or-login-with";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import VisibilityButton from "@/components/ui/visibility-button";
import { useAuth } from "@/lib/authContext";
import Link from "next/link";
import React, {  useState } from "react";
import { useForm } from "react-hook-form";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {

  const {login} = useAuth();


  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const onSubmit = async (data: LoginData) => {

      setLoading(true);
      await login(data);

        setLoading(false);
      


  }


  return (
    <div className="md:w-[30%] min-w-[350px]">
      <div className=" p-4 border rounded-md  shadow-[1px_1px_2px_rgba(255,255,255,0.1)] ">
        <h1 className="text-2xl font-bold py-2 ">Login with Tweetly</h1>
        <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">
          Enter your email below to login to your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-2">
          <label className="">Email</label>
          <Input
            type="text"
            {...register("email", { required: "Email is Required" })}
            placeholder="m@example.com"
          />

          <div className="h-3 p-0">
          {errors.email && (
            <span className="text-red-500 text-left text-sm mt-0">
              {errors.email.message}
            </span>
          )}
            
          </div>
          <div className="flex justify-between items-center mt-3">
            <label className="">Password</label>
            <Link href={"/login/passwordreset"} >
           <p className=" cursor-pointer">Forgot your password?</p> 
           </Link>
          </div>
          <div className="relative">
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              {...register("password", { required: "Password is Required" })}
              placeholder="Password"
            />

            <VisibilityButton
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            ></VisibilityButton>
          </div>

          <div className="h-2">

          {errors.password && (
            <span className="text-red-500 text-left text-sm">
              {errors.password.message}
            </span>
          )}

          </div>

          <Button
            className="mt-6 w-full text-center py-3"
            variant={"primary"}
            type="submit"
            disabled={!isValid}
            loading={loading}
          >
            Login
          </Button>
        </form>

        <OrLoginWith />


        <span className="text-center block w-full  pt-4">
          Don&apos;t have an account?{" "}
          <Link href={"/signup"} className="underline">
            {" "}
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
