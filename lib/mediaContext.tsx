"use client"
import { useNotification } from "@/components/notification/notificationContext";
import { createContext, useContext, useState } from "react";
import { domain } from "./utils";
import axios from "axios";
import { FileType } from "./xContext";

type MediaContextType = {
    getMediaFiles: () =>  Promise<boolean>,
    mediaFiles:FileType[],
    uploadMedia:(data:FileType[]) => Promise<boolean>
    deleteMedia:(id:string) => Promise<boolean>

}

// type FileType = {
//     id:string,
//     fileName:string,
//     fileType:string, 
//     fileSize:number,
//     fileURL:string,
//     postIds:string[]
// }

const MediaContext = createContext<MediaContextType | undefined>(undefined);    

export const MediaContextProvider = ({children}:{children:React.ReactNode}) => {
    const {showNotification} = useNotification();
    const [mediaFiles, setMediaFiles] = useState<FileType[] >([]);

    const getMediaFiles = async () => {

        try {
            const URL = `${domain}/api/v1/user/media/getallmedia`

            const result = await axios.get(URL, {
                withCredentials:true
            })
            const files: FileType[] = result.data.files;
            setMediaFiles(files);
            console.log(files);
            return true;

        }

        catch(err) {

            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;


        }
    }

    const uploadMedia = async (data:FileType[]) => {

        try {
            const URL = `${domain}/api/v1/user/media/uploadmedia`;
            const result = await axios.post(URL,{
                data
            }, {
                withCredentials:true
            })

            showNotification({
             
                message:`${result.data.message}`,
                type:"positive"
              })


            return true;

        }

        catch(err) {

            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;


        }
    }

    const deleteMedia = async (id:string) => {

        try {
            const URL = `${domain}/api/v1/user/media/deletemedia/${id}`;

            const result = await axios.delete(URL, {withCredentials:true});
            
            showNotification({
             
                message:`${result.data.message}`,
                type:"positive"
              })


            return true;

        }
        catch(err) {
            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;

        }
    }

    return (
        <MediaContext.Provider value={{getMediaFiles, mediaFiles, uploadMedia, deleteMedia}}>
            {children}
        </MediaContext.Provider>
    )
}

export const useMedia = () => {
    const context = useContext(MediaContext);

    if (!context) {
        throw new Error("useMedia must be used within an Media Provider");
      }
      return context;
}