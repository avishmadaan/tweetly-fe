"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { domain } from "./utils";
import axios from "axios";
import { useNotification } from "@/components/notification/notificationContext";
import { useRouter } from "next/navigation";
import type{Value} from "react-multi-date-picker"
import { UseAi } from "./aiContext";

type xContextType = {
    currentTweet:string;
    setCurrentTweet:React.Dispatch<React.SetStateAction<string>>;
    whenToPost:WhenToPost;
    setWhenToPost:React.Dispatch<React.SetStateAction<WhenToPost>>
    currentPostMedia:FileType[];
    setCurrentPostMedia:React.Dispatch<React.SetStateAction<FileType[]>>
    createOrUpdateDraftPost:() => Promise<boolean>,
    fetchAllDrafts:() => Promise<boolean>,
    fetchAllPublished:() => Promise<boolean>,
    draftPosts:PostsType[]
    publishedPosts:PostsType[]
    scheduledPost:PostsType[]
    usingDraft:(id:string) => void;
    usingScheduled:(id:string) => void
    deleteDraft:(id:string) => void;
    currentPostTime:Value,
    setCurrentPostTime:React.Dispatch<React.SetStateAction<Value>>
    moveToDraft:(id:string) => Promise<boolean>
    settinngAiTweet:(text:string) => void;
    publishingTweetToTwitter:() => void;
}

export type FileType = {
    id:string,
    fileName:string,
    fileType:string, 
    fileSize:number,
    fileURL:string,
    postIds:string[]
}

type WhenToPost = "now" | "schedule";

export type PostsType = {
    id:string,
    postContent:string,
    updatedAt:string,
    files:FileType[],
    fileIds:string[],
    tweetId?:string
}

const XContext =  createContext<xContextType | undefined>(undefined);

export const XContextProvider = ({children}:{children:React.ReactNode}) => {
    const { Xdata} = UseAi();
    const {showNotification} = useNotification();
    const [whenToPost, setWhenToPost] = useState<WhenToPost>("now");
    const [draftPosts, setDraftsPosts] = useState<PostsType[]>([]);
    const [publishedPosts, setPublishedPosts] = useState<PostsType[]>([]);
    const [scheduledPost, setScheduledPosts] = useState<PostsType[]>([]);
    const [currentTweet, setCurrentTweet] = useState<string>("");
    const [currentPostMedia, setCurrentPostMedia] = useState<FileType[]>([]);
    const [currentPostTime, setCurrentPostTime] = useState<Value>(new Date());
    
    const [currentPostId, setCurrentPostId] = useState<string | null>(null);
    const router = useRouter();

    const createOrUpdateDraftPost = async () => {

        try {
            const URL = `${domain}/api/v1/user/posts/createOrUpdatedraft`;
            const result = await axios.post(URL, {
                postContent:currentTweet,
                mediaFiles:currentPostMedia,
                postId:currentPostId
            },{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
            })

            setCurrentTweet("");
            setCurrentPostMedia([]);
            setCurrentPostId(null);
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

    const fetchAllPublished = async () => {

        try {
            const URL = `${domain}/api/v1/user/posts/getpublishedpost`;
            const result = await axios.get(URL,{withCredentials:true});
            console.log(result.data)
            setPublishedPosts(result.data.publishedPosts);
            return true;

        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Fetch Published Posts",
                type:"negative"
            })
            return false;
        }

    }

    const fetchAllScheduled = async () => {

        try {
            const URL = `${domain}/api/v1/user/posts/getscheduledpost`;
            const result = await axios.get(URL,{withCredentials:true});
            console.log(result.data)
            setScheduledPosts(result.data.scheduledPosts);
            return true;

        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Fetch Published Posts",
                type:"negative"
            })
            return false;
        }

    }

    const usingDraft = (id:string) => {

        const post = draftPosts.filter((post) => post.id == id)[0];
        const postContent = post.postContent;
        const mediaFiles = post.files

        setCurrentTweet(postContent);
        setCurrentPostMedia(mediaFiles);
        setCurrentPostId(id);
        router.push("/dashboard/publish/editor");


    }

    const usingScheduled = (id:string) => {

        const post = draftPosts.filter((post) => post.id == id)[0];
        const postContent = post.postContent;
        const mediaFiles = post.files

        setCurrentTweet(postContent);
        setCurrentPostMedia(mediaFiles);
        setCurrentPostId(id);
        router.push("/dashboard/publish/editor");

    }

    const deleteDraft = async (id:string) => {

        
        try {
            const URL = `${domain}/api/v1/user/posts/deletepost/${id}`;
            const result = await axios.delete(URL,{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
            })

            setDraftsPosts(draftPosts.filter((post) => post.id !=id));
            setCurrentPostId(null);

            return true;


        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Delete Draft Post",
                type:"negative"
            })
            return false;
        }


    }

    const moveToDraft = async(id:string) => {

         
        try {
            const URL = `${domain}/api/v1/user/posts/movetodraft/${id}`;
            const result = await axios.put(URL,{},{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
            })
            return true;


        }
        catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Update Post Status",
                type:"negative"
            })
            return false;
        }



    }

    const settinngAiTweet = (text:string) => {
        setCurrentTweet(text);
    }

    const publishingTweetToTwitter = async() => {
        try {
            const URL = `${domain}/api/v1/user/posts/publishposttotwitter`
            

            const response = await axios.post(URL, {
                tweetText:currentTweet,
                id:Xdata?.id,
                postMedia:currentPostMedia
            }, {
                withCredentials:true
            })
            console.log("reached here")
            console.log(response.data)

        } catch(err) {
            console.log(err);
            showNotification({
                message:"Failed To Post Tweet",
                type:"negative"
            })

        }
    }


    useEffect(() => {
        fetchAllDrafts();
    }, [])

    return (
        <XContext.Provider value={{currentTweet,setCurrentTweet, whenToPost, setWhenToPost, currentPostMedia, setCurrentPostMedia, createOrUpdateDraftPost, fetchAllDrafts, draftPosts, usingDraft, deleteDraft, setCurrentPostTime, currentPostTime, moveToDraft, usingScheduled, settinngAiTweet, publishedPosts, fetchAllPublished, publishingTweetToTwitter}} >
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