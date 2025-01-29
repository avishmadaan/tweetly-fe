"use client";

import { UseAi } from "@/lib/aiContext";
import { FileType } from "@/lib/xContext";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import Skeleton from 'react-loading-skeleton';


const PreviewTweet = ({
  className,
  currentTweet,
  currentPostMedia
}: {
  className?: string,
  currentTweet:string,
  currentPostMedia:FileType[]
}) => {
  const { Xdata } = UseAi();

  const isEmptyContent = (html:string) => {

    if(currentPostMedia.length >0) {
      return false;
    }
    if (typeof window === "undefined") {
        // Avoid executing during SSR
        return false;
      }
    const doc = new DOMParser().parseFromString(html,"text/html");
    const bodyText = doc.body.textContent || "";
    return !bodyText.trim();
  }

  const alignment:{
    [key:string]:string
  } = {
    "1": "grid-cols-1",
    "2": "grid-cols-2",
    "3": "grid-cols-2",
    "4": "grid-cols-2",
    "default": "grid-cols-3",
  };
  
  const gridClass = alignment[currentPostMedia.length.toString()] || alignment.default;

  return (
    <div className={`${className} bg-[#F7F7F7] dark:bg-gray-800 p-6 rounded-md `}>

      <div className="border p-4 rounded-md bg-white dark:bg-black grid grid-cols-[1fr_15fr] gap-2 w-full">
        
        <div className="min-w-8" id="left">
          {Xdata?.profilePicture ? (
            <Image
              src={Xdata?.profilePicture}
              alt={"profile pic"}
              width={28}
              height={28}
              className="rounded-full "
            />
          ) : (
            <CgProfile size={28} className="rounded-full " />
          )}
        </div>

        <div className="" id="right">

          <div className="flex flex-grow gap-2 items-center" id="meta">
            <h2 className="font-bold ">{Xdata?.name || "Your Name Here"}</h2>

            <p className="text-gray-500 text-sm">
              @{Xdata?.username || "yourusername"}. Now
            </p>

          </div>

          <div className="mt-2 " id="content" >

            <div className="" id="contentsskeleton">
            <div className="mb-4 break-all whitespace-pre-line  [&>p]:mb-4" id="content2" dangerouslySetInnerHTML={{ __html: currentTweet }}>
        </div>


            {isEmptyContent(currentTweet)&& (
                <div className="">
                <Skeleton count={1} height={8} className="block bg-gray-300 -mb-3 "/>
                <Skeleton count={1} height={8} className="block bg-gray-300 -mb-3 "/>
                <Skeleton count={1} height={8} className="block bg-gray-300 -mb-3 w-1/2"/>
                </div>
            )}

            </div>

            <div className={` grid gap-1 ${gridClass} `} id="media">
               {currentPostMedia.map((file, index) => (
                      
                      
                          <Image  key={index} src={file.fileURL} alt="media preview" title="twitter image"
                          width={26} height={4} className={`w-full h-full  ${currentPostMedia.length ==3 && index ==0 && "row-span-2"} `}  />

                        
               ))}


            </div>

        
       
            

       

       
                
           
          
            <div
              className="flex gap-2 justify-between text-gray-400 mt-4"
              id="reaction"
            >
              <MessageCircle className="cursor-pointer" />
              <Repeat2 className="cursor-pointer" />
              <Heart className="cursor-pointer" />
              <Share className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1  mx-auto text-center justify-center">
        <FaXTwitter size={24} className="my-4 " />
        <span className="text-lg text-gray-800 dark:text-white">Preview</span>
      </div>

      <p className="text-gray-500 dark:text-white text-xs text-center w-full px-4 mx-auto">
        Social media platforms often update their formatting, which may cause
        your posts to appear slightly different once published.
      </p>
    </div>
  );
};

export default PreviewTweet;
