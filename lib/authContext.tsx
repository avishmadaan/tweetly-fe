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
    user:UserData | null
    passwordResetLinkSend:(data:forgotPasswordData) => Promise<boolean>
    passwordReset:(data:ResetPasswordData) => Promise<boolean | undefined>
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

type UserData = {
  email:string
  password?:string
  authProvider:string
  name?:string
  profilePicture?:string

}


type forgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  password: string;
  confirmPassword:string
  token:string
};



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {

const [isAuthenticated, setIsAuthenticated]
= useState<boolean>(false);

const [user, setUser] = useState< UserData | null>(null);

const router = useRouter();
const {showNotification} = useNotification();

  
  useEffect(() => {
    console.log("user fetched")
    const token = Cookies.get("auth_token");
    if (token) {
      setIsAuthenticated(true);
      getUserDetail();
    }

    const handleGoogleAuth = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:4000") {
        return;  
    }

    const {success}= event.data || {}
    
    if(success) {
      setIsAuthenticated(true);
        getUserDetail();
    }
 
    }

    window.addEventListener("message",handleGoogleAuth)

        return () => {
            window.removeEventListener("message", handleGoogleAuth)
        }
  }, [isAuthenticated]);



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

      await router.push(`/signup/verification?email=${encodeURIComponent(result.data.email)}`)
      
      
    }
    catch(e) {
      console.log(e)
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message || "Internal Server Error",
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

     await router.push(`/login`)
      
      
    }
    catch(e) {
      console.log(e)
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message || "Internal Server Error",
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
        message:e.response.data.message || "Internal Server Error",
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

        await router.push("/dashboard/home");
        
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
          message:e.response.data.message || "Internal Server Error",
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
        await router.push("/login");
        showNotification({
          message:response.data.message,
          type: "positive",
        });
        
      }
      catch(e) {
        
        showNotification({
           //@ts-expect-error  because of message
          message:e.response.data.message || "Internal Server Error",
          type: "negative",
        });

      }
  
    }

    const passwordResetLinkSend = async (data:forgotPasswordData) => {
 

      try{

        const URL = `${domain}/api/v1/user/passwordreset`;
        console.log(URL);
        const result = await axios.post(URL, data)
  
        
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
          message:e.response.data.message || "Internal Server Error",
          type:"negative"
        })
        return false;
      }
    }


    const passwordReset = async (data: ResetPasswordData) => {

      try{
        console.log(data)
        const URL = `${domain}/api/v1/user/passwordreset/newpassword`;
        console.log(URL);
        const result = await axios.post(URL, data, {

          headers:{
            Authorization:data.token
          }
        })
  
        
        showNotification({
          message:result.data.message,
          type:"positive"
        })

        await router.push(`/login`)

        
      }
      catch(e) {
        console.log(e)
        showNotification({
          //@ts-expect-error  because of message
          message:e.response.data.message || "Internal Server Error",
          type:"negative"
        })
        return false;
      }
  
    }

    

  const getUserDetail = async () => {

    try{
      const URL = `${domain}/api/v1/user/getuserdetail`;
      const result = await axios.get(URL,{
        withCredentials:true
      });
      setUser(result.data.user);
      return true;

      }
    catch(e) {
      console.log(e)
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message ||" Internal Server Error",
        type:"negative"
      })
      return false;
    }

  }

    return (
        <AuthContext.Provider value={{login, logout, signUp,  isAuthenticated, otpVerfication, reSendOtp, user, passwordResetLinkSend, passwordReset}}>
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





