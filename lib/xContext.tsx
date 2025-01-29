"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { domain } from "./utils";
import axios from "axios";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from '@tiptap/extension-hard-break';
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useNotification } from "@/components/notification/notificationContext";
import {Editor, useEditor} from "@tiptap/react"
import { useRouter } from "next/navigation";

type xContextType = {
    currentTweet:string;
    setCurrentTweet:React.Dispatch<React.SetStateAction<string>>;
    whenToPost:WhenToPost;
    setWhenToPost:React.Dispatch<React.SetStateAction<WhenToPost>>
    currentPostMedia:FileType[];
    setCurrentPostMedia:React.Dispatch<React.SetStateAction<FileType[]>>
    createOrUpdateDraftPost:() => Promise<boolean>,
    fetchAllDrafts:() => Promise<boolean>,
    draftPosts:PostsType[]
    editor:Editor | null
    usingDraft:(id:string) => void;
    deleteDraft:(id:string) => void;
      
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
    fileIds:string[]
}

const XContext =  createContext<xContextType | undefined>(undefined);

export const XContextProvider = ({children}:{children:React.ReactNode}) => {

    const [editor, setEditor] = useState<Editor | null>(null);
    const {showNotification} = useNotification();
    const [whenToPost, setWhenToPost] = useState<WhenToPost>("now");
    const [draftPosts, setDraftsPosts] = useState<PostsType[]>([]);
    const [currentTweet, setCurrentTweet] = useState<string>("");
    const [currentPostMedia, setCurrentPostMedia] = useState<FileType[]>([]);
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
            editor?.commands.clearContent();
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

    const usingDraft = (id:string) => {

        const post = draftPosts.filter((post) => post.id == id)[0];
        const postContent = post.postContent;
        const mediaFiles = post.files

        setCurrentTweet(postContent);
        setCurrentPostMedia(mediaFiles);
        editor?.commands.clearContent();
        editor?.commands.insertContent(postContent);
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

    const editorInstance = useEditor({
        content: currentTweet,
        extensions: [StarterKit, Bold, Italic, Underline, Link, HardBreak],
        onUpdate: ({ editor }) => setCurrentTweet(editor.getText().slice(0,280)),
      });


    useEffect(() => {
        // createDraftPost()
        // setEditor(editorNew); 
        if (editorInstance) {

            setEditor(editorInstance);
          }
       
    },[editorInstance])

    return (
        <XContext.Provider value={{currentTweet,setCurrentTweet, whenToPost, setWhenToPost, currentPostMedia, setCurrentPostMedia, createOrUpdateDraftPost, fetchAllDrafts, draftPosts, editor, usingDraft, deleteDraft}} >
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