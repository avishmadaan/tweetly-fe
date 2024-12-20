"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/notification/notificationContext";
import axios from "axios";
import { domain } from "./utils";

type AuthContextType = {
    isAuthenticated: boolean,
    login: (data:LoginData)=> Promise<boolean>,
    logout:()=> void,
    signUp:(data:RegistrationData)=> Promise<boolean | undefined>
    otpVerfication:(data:OTPVerificationData) => Promise<boolean | undefined>
    reSendOtp:(email:string)=> Promise<boolean>
}
type RegistrationData = {
  email: string;
  password: string;
  confirmPassword:string
};

type LoginData = {
  email: string;
  password: string;
};

type OTPVerificationData = {
  email: string;
  otp: string;

};



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {

const [isAuthenticated, setIsAuthenticated]
= useState(false);

const router = useRouter();
const {showNotification} = useNotification();

  
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);



   const signUp = async (data: RegistrationData) => {

    try{
      console.log(data)
      const URL = `${domain}/api/v1/user/otp/signup`;
      console.log(URL);
      const result = await axios.post(URL, data)

      
      showNotification({
        message:result.data.message,
        type:"positive"
      })

      router.push(`/signup/verification?email=${encodeURIComponent(result.data.email)}`)
      
      
    }
    catch(e) {
      console.log(e)
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message,
        type:"negative"
      })
      return false;
    }

  }

  const otpVerfication = async (data: OTPVerificationData) => {

    try{
      console.log(data)
      const URL = `${domain}/api/v1/user/signup/verification`;
      console.log(URL);
      const result = await axios.post(URL, data)

      
      showNotification({
        message:result.data.message,
        type:"positive"
      })

      router.push(`/login`)
      
      
    }
    catch(e) {
      console.log(e)
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message,
        type:"negative"
      })
      return false;
    }

  }

  const reSendOtp = async (email:string) => {

    try{

      const URL = `${domain}/api/v1/user/signup/verification/newotp`;
      console.log(URL);
      const result = await axios.post(URL, {email})

      
      showNotification({
        message:result.data.message,
        type:"positive"
      })

      return true;

      
      
    }
    catch(e) {
      console.log(e)
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message,
        type:"negative"
      })
      return false;
    }

  }


    const login = async (data:LoginData) => {
      try{
        console.log(data)
        const URL = `${domain}/api/v1/user/login`;
        const result = await axios.post(URL, data)
  
        setIsAuthenticated(true);

        Cookies.set("auth_token", result.data.token, {expires:7, path:"/"});

        router.push("//dashboard/home");
        
        showNotification({
          message:result.data.message,
          type:"positive"
        })

        return true;
        
        
      }
      catch(e) {
        console.log(e)
        showNotification({
          //@ts-expect-error  because of message
          message:e.response.data.message,
          type:"negative"
        })
        return false;
      }
    
    }
    
    const logout = async () => {

      try{
        const URL = `${domain}/api/v1/user/logout`;
        const response = await axios.post(URL, {},{
          withCredentials:true,
        });
        setIsAuthenticated(false);
        router.push("/login");
        showNotification({
          message:response.data.message,
          type: "positive",
        });
        
      }
      catch(e) {
        
        showNotification({
           //@ts-expect-error  because of message
          message:e.response.data.message,
          type: "negative",
        });

      }
  
    }

    return (
        <AuthContext.Provider value={{login, logout, signUp,  isAuthenticated, otpVerfication, reSendOtp}}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = ():AuthContextType => {

    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}





