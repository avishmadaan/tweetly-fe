"use client"

import { useNotification } from "@/components/notification/notificationContext";
import axios from "axios";
import { useContext , createContext, useState, useEffect, ReactElement} from "react";
import { domain } from "./utils";
import Cookies from "js-cookie";
import OpenAI from "openai"



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
    selectedBot:AiBot | null,
    setSelectedBot:React.Dispatch<React.SetStateAction<AiBot | null>>;
    aiBots:AiBot[]
    getAssistantReply:(messages:Message[], setMessages:React.Dispatch<React.SetStateAction<Message[]>>) => void
    chats: Message[]
    setChats: React.Dispatch<React.SetStateAction<Message[]>>
    tIChats:Message[]
    setTIChats:React.Dispatch<React.SetStateAction<Message[]>>
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

  export type AiBot = {
    id:string,
    name:string,
    tag:string,
    imageURL:string,
    twitterLink:string,
    profile?:string
  }

  export interface Message {
    role: "system" | "user" | "assistant";
    content:string;
  }

const AiContext =  createContext<AiContextType | undefined> (undefined);


export const AiContextProvider = ({children}:{children:React.ReactNode}) => {

    const {showNotification} = useNotification();
    const [isKeyAuthenticated, setIsKeyAuthenticated] = useState<boolean>(false);
    const [openAiKey, setOpenAiKey] = useState<string>("");
    const [Xdata, setXdata] = useState<Xdata | null>(null)
    const [isXIntegrated, setIsXIntegrated] = useState<boolean>(false);

    //bots
    const [selectedBot, setSelectedBot] = useState<AiBot | null>(null);
    const [aiBots, setAiBots] = useState<AiBot[]>([]);
     const [chats, setChats] = useState<Message[]>([]);
     const [tIChats, setTIChats] = useState<Message[]>([]);
    

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
        getBots();


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

    const getBots = async () => {
        try {
            const URL = `${domain}/api/v1/user/ai/getbots`;
            const result = await axios.get(URL, {
                withCredentials:true
            })

            setAiBots(result.data.bots);
            setSelectedBot(result.data.bots[0]);
        } catch(err){
            console.log(err);
        }

    }


  const getContext = async (embeddingVector:number[]) => {

    try {
      const URL = `${domain}/api/v1/user/ai/getcontext`;
      const result = await axios.post(URL,{embeddingVector}, {
        withCredentials:true
      } )
  
      return result.data.context;

    } catch(err){
      console.log(err);
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message || "Internal Server Error",
        type:"negative"
      })


    }


  }
  const openai = new OpenAI({
    apiKey:openAiKey,
    dangerouslyAllowBrowser:true
  })

  const getAssistantReply = async (chatHistory: Message[], setMessages:React.Dispatch<React.SetStateAction<Message[]>>) => {
    const lastMessage = chatHistory[0]?.content;
    const embeddingVector = await getEmbedding(lastMessage);
    const tweetContext = await getContext(embeddingVector);

    const systemMessage: Message = {
        role: "system",
        content: `
        You are ${selectedBot?.name}, ${selectedBot?.profile}
  
        Below is some context gathered from 5 of your recent tweets (via vector search). Use this context to guide your responses if it’s relevant, but keep your unique voice and style. If the context lacks the necessary details, rely on your extensive coding experience without mentioning the source.
  
        --------
        START CONTEXT
        ${tweetContext}
        END CONTEXT
  
        ----
        QUESTION: ${lastMessage}
        ----
        `,
      };
      const requestBody = {
        model:"gpt-4",
        messages:[systemMessage, ...chatHistory],
        stream:true
      }
      try {

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${openAiKey}`
          },
          body: JSON.stringify(requestBody)
        })
  
        if (!response.ok || !response.body) {
          throw new Error("Stream response error");
        }
  
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;
        let assistantReply ="";
  
  
        setMessages((prev) => [...prev, {role:"assistant", content:" "}]);
  
        while(!done) {
          const {value, done:doneReading} = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value, {stream:true})
  
          const lines = chunkValue.split("\n").filter((line) => line.trim() !=="");
  
          for(const line of lines) {
            if(line.startsWith("data: ")) {
              const dataStr = line.replace("data: ","").trim();
              if(dataStr === "[DONE]") {
                done= true;
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                const content = parsed.choices[0]?.delta?.content;
  
                if(content) {
                  assistantReply += content;
  
                  setMessages((prev) => {
                    const updated = [...prev]
                    const lastIndex = updated.length -1;
                    updated[lastIndex] = {role:"assistant", content:assistantReply};
                    return updated;
                  })
                }
              } catch(err) {
                console.error("Error parsing stream chunk:", err);
              }
            }
          }
  
        }
  
  
      }
      catch(err) {
        console.error("Error during chat completion:", err);
        showNotification({
          message: "Error during chat completion",
          type: "negative",
        });
  
      }



  }

  const getEmbedding = async (message:string) => {
    let embeddingVector:number[] =[];
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: message,
        encoding_format: "float",
      });
      embeddingVector = embeddingResponse.data[0].embedding;
      return embeddingVector;

    } catch (err) {
      console.error("Error getting embedding:", err);
      showNotification({ message: "Error getting embedding", type: "negative" });
      return [];
      
    } 
  }


    return (
        <AiContext.Provider value={{checkValidAPI, isKeyAuthenticated, removeApiKey, openAiKey, integrateX, getXDetails, Xdata, isXIntegrated, logOutXAccount, setSelectedBot,selectedBot, aiBots, getAssistantReply, chats, setChats, setTIChats, tIChats }} >
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