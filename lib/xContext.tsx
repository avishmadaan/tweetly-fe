"use client"
import { createContext, useContext, useState } from "react";

type xContextType = {
    currentTweet:string;
    setCurrentTweet:React.Dispatch<React.SetStateAction<string>>;
    whenToPost:WhenToPost;
    setWhenToPost:React.Dispatch<React.SetStateAction<WhenToPost>>

}

type WhenToPost = "now" | "schedule"

const XContext =  createContext<xContextType | undefined>(undefined);

export const XContextProvider = ({children}:{children:React.ReactNode}) => {

    const [whenToPost, setWhenToPost] = useState<WhenToPost>("now");

    const [currentTweet, setCurrentTweet] = useState<string>("");

    return (
        <XContext.Provider value={{currentTweet,setCurrentTweet, whenToPost, setWhenToPost }} >
            {children}
        </XContext.Provider>
    )

}

export const UseX = () => {
    const context = useContext(XContext);
        if (!context) {
          throw new Error("UseX must be used within an x Provider");
        }
        return context;


}