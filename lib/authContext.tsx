"use client"
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/notification/notificationContext";

type AuthContextType = {
    isAuthenticated: boolean,
    login: (token:string) => void,
    logout:()=> void
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {

const [isAuthenticated, setIsAuthenticated]
= useState(false);

const router = useRouter();
const {showNotification} = useNotification();


    const login = (token:string) => {
        setIsAuthenticated(true);
        Cookies.set("token", token, {expires:7, path:"/"});
    
    }
    
    const logout = () => {
    
        Cookies.remove("token");
        setIsAuthenticated(false);
        router.push("/login");
        showNotification({message:"Logged Out Successfully", type:'positive'})
    }

    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated}}>
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





