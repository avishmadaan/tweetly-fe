"use client"

import { useNotification } from "@/components/notification/notificationContext";
import axios from "axios";
import { useContext , createContext, useState, useEffect, ReactElement} from "react";
import { domain } from "./utils";
import Cookies from "js-cookie";



type AiContextType = {
    checkValidAPI: (key:string) => Promise<boolean>;
    isKeyAuthenticated:boolean;
    removeApiKey:() => void;
    openAiKey:string;
    integrateX:() => void
    getXDetails: () => Promise<boolean>
    Xdata:Xdata | null
    isXIntegrated:boolean;
    logOutXAccount:() => void
    selectedBot:Bot | null,
    setSelectedBot:React.Dispatch<React.SetStateAction<Bot | null>>;
}

type Xdata = {
    twitterId:string,
    username:string,
    name:string,
    profilePicture:string,
    accessToken:string,
    refreshToken:string
}

export type Bot = {
  image: ReactElement;
  name: string;
  };


const AiContext =  createContext<AiContextType | undefined> (undefined);


export const AiContextProvider = ({children}:{children:React.ReactNode}) => {

    const {showNotification} = useNotification();
    const [isKeyAuthenticated, setIsKeyAuthenticated] = useState<boolean>(false);
    const [openAiKey, setOpenAiKey] = useState<string>("");
    const [Xdata, setXdata] = useState<Xdata | null>(null)
    const [isXIntegrated, setIsXIntegrated] = useState<boolean>(false);

    //bots
    const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
    

    useEffect(() => {
        const xAccessToken = Cookies.get("xAccessToken");
        const xRefreshToken = Cookies.get("xRefreshToken");

        if(xAccessToken && xRefreshToken) {
            getXDetails();

        }

        const checkIfApiKeyValidOnStart = async() => {

            const openAiAuth = localStorage.getItem("openAiAuth");
            if(openAiAuth) {
            
                    setIsKeyAuthenticated(true);
                    setOpenAiKey(openAiAuth);
    
            }
        }


        checkIfApiKeyValidOnStart();


    },[])


    const checkValidAPI = async (key:string) => {

        try {
            const URL = `https://api.openai.com/v1/models`;

            await axios.get(URL, {
                headers:{
                    Authorization: `Bearer ${key}`
                }
            })

            

              setIsKeyAuthenticated(true);
              return true;

        }

        catch(e) {
            console.log(e)
            showNotification({
                message:"API key is invalid",
                type:"negative"
              })
              return false;

        }


    }

    const removeApiKey = () => {

        localStorage.removeItem("openAiAuth")
        setIsKeyAuthenticated(false);

        showNotification({
            message:"API Key Deleted",
            "type":"positive"
        })
    }

    const integrateX = () => {

        const twitterIntegrateUrl = "http://localhost:4000/api/v1/user/path/auth/twitter"

        window.open(
            twitterIntegrateUrl,
             "googleLoginPopup",
            "width=500,height=600"
        )


    }

    const getXDetails = async () => {

        try {
            const URL = `${domain}/api/v1/user/path/twitter/accountinfo`;

            const result = await axios.get(URL,{
                withCredentials:true
              });

            console.log(result.data);
            setXdata(result.data.account);
            setIsXIntegrated(true);

            Cookies.set("xAccessToken",result.data.account.accessToken);
            Cookies.set("xRefreshToken",result.data.account.refreshToken);
            return true;

        }

        catch(e) {
            console.log(e);
            showNotification({
                //@ts-expect-error  because of message
                message:e.response.data.message || "Internal Server Error",
                type:"negative"
              })
              return false;
        }

    }

    const logOutXAccount =  () => {

        console.log("Logged Out");
        Cookies.remove("xAccessToken", { path: "/" });
        Cookies.remove("xRefreshToken", { path: "/" });
        setIsXIntegrated(false);
        showNotification({
            message:"Profile Disconnected Successfully",
            type:"positive"
        })
    }

    return (
        <AiContext.Provider value={{checkValidAPI, isKeyAuthenticated, removeApiKey, openAiKey, integrateX, getXDetails, Xdata, isXIntegrated, logOutXAccount, setSelectedBot,selectedBot }} >
            {children}
        </AiContext.Provider>
    )
}

export const UseAi = () => {
const context = useContext(AiContext);
    if (!context) {
      throw new Error("useAi must be used within an Ai Provider");
    }
    return context;

}