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
      
}

type WhenToPost = "now" | "schedule"

const XContext =  createContext<xContextType | undefined>(undefined);

export const XContextProvider = ({children}:{children:React.ReactNode}) => {

    const {showNotification} = useNotification();
    const [whenToPost, setWhenToPost] = useState<WhenToPost>("now");
    const [draftPosts, setDraftsPosts] = useState<string[]>([]);
    const [currentTweet, setCurrentTweet] = useState<string>("");
    const [currentPost, setCurrentPost] = useState<string>("");

    const createDraftPost = async () => {

        try {
            const URL = `${domain}/api/v1/user/posts/createdraft`;
            const result = await axios.post(URL, null,{withCredentials:true});

            console.log(result.data);

            const draftPostsData = result.data.draftPosts;
            setDraftsPosts(draftPostsData);

        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Create Draft Post",
                type:"negative"
            })
        }
    }

    const fetchAllDrafts = async () => {

        try {
            const URL = `${domain}/api/v1/user/posts/getalldrafts`;
            const result = await axios.get(URL,{withCredentials:true});

            showNotification({
                message:"Draft Post Created Successfully",
                type:"positive"
            })
            console.log(result.data);

            const postId = result.data.post.id;
            setCurrentPost(postId);

        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Create Draft Post",
                type:"negative"
            })
        }

    }


    useEffect(() => {
        // createDraftPost()
       
    },[])

    return (
        <XContext.Provider value={{currentTweet,setCurrentTweet, whenToPost, setWhenToPost}} >
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