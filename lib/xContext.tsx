"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { domain } from "./utils";
import axios from "axios";
import { useNotification } from "@/components/notification/notificationContext";

type xContextType = {
    currentTweet:string;
    setCurrentTweet:React.Dispatch<React.SetStateAction<string>>;
    whenToPost:WhenToPost;
    setWhenToPost:React.Dispatch<React.SetStateAction<WhenToPost>>
    currentPostMedia:FileType[];
    setCurrentPostMedia:React.Dispatch<React.SetStateAction<FileType[]>>
    createDraftPost:() => Promise<boolean>,
    fetchAllDrafts:() => Promise<boolean>,
    draftPosts:PostsType[]
      
}

export type FileType = {
    id:string,
    fileName:string,
    fileType:string, 
    fileSize:number,
    fileURL:string
}

type WhenToPost = "now" | "schedule";

type PostsType = {
    id:string,
    postContent:string,
    updatedAt:string,
    file:FileType[],
}

const XContext =  createContext<xContextType | undefined>(undefined);

export const XContextProvider = ({children}:{children:React.ReactNode}) => {

    const {showNotification} = useNotification();
    const [whenToPost, setWhenToPost] = useState<WhenToPost>("now");
    const [draftPosts, setDraftsPosts] = useState<PostsType[]>([]);
    const [currentTweet, setCurrentTweet] = useState<string>("");
    const [currentPostMedia, setCurrentPostMedia] = useState<FileType[]>([]);

    const createDraftPost = async () => {

        try {
            const URL = `${domain}/api/v1/user/posts/createdraft`;
            const result = await axios.post(URL, {
                postContent:currentTweet,
                mediaFiles:currentPostMedia
            },{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
            })

            setCurrentTweet("");
            setCurrentPostMedia([]);

            return true;


        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Create Draft Post",
                type:"negative"
            })
            return false;
        }
    }

    const fetchAllDrafts = async () => {

        try {
            const URL = `${domain}/api/v1/user/posts/getalldrafts`;
            const result = await axios.get(URL,{withCredentials:true});

            setDraftsPosts(result.data.draftPosts);
            return true;


        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Fetch Draft Posts",
                type:"negative"
            })
            return false;
        }

    }


    useEffect(() => {
        // createDraftPost()
       
    },[])

    return (
        <XContext.Provider value={{currentTweet,setCurrentTweet, whenToPost, setWhenToPost, currentPostMedia, setCurrentPostMedia, createDraftPost, fetchAllDrafts, draftPosts}} >
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