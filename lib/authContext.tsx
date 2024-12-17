"use client"
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
    isAuthenticated: boolean,
    login: (token:string) => void,
    logout:()=> void
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {

    const [isAuthenticated, setIsAuthenticated]
= useState(false);


    const login = (token:string) => {
        setIsAuthenticated(true);
        Cookies.set("token", token, {expires:7, path:"/"});
    
    }
    
    const logout = () => {
    
        Cookies.remove("token");
        setIsAuthenticated(false);
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





