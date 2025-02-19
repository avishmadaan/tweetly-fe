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
  currentPostMedia,
  previewClaim=true
}: {
  className?: string,
  currentTweet:string,
  previewClaim?:boolean
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
    <div className={`${className} bg-[#F7F7F7] dark:bg-gray-800 p-6 rounded-md w-full `}>

      <div className="border p-4 rounded-md bg-white dark:bg-black flex gap-1 w-full">
        
        <div className="w-[10%]" id="left">
          {Xdata?.profilePicture ? (
            <Image
              src={Xdata?.profilePicture}
              alt={"profile pic"}
              width={40}
              height={40}
              className="rounded-full "
            />
          ) : (
            <CgProfile size={30} className="rounded-full " />
          )}
        </div>

        <div className="w-[90%] pl-1 flex-wrap" id="right">

          <div className="flex flex-grow gap-2 items-center" id="meta">
            <h2 className="font-bold ">{Xdata?.name || "Your Name Here"}</h2>

            <p className="text-gray-500 text-sm">
              @{Xdata?.username || "yourusername"}. Now
            </p>

          </div>

          <div className=" " id="content" >

            <div className="" id="contentsskeleton">
              {currentTweet && (
        <div className=" whitespace-pre-wrap break-words overflow-hidden  " id="content2" >
        {currentTweet}
       
  </div>
              )}
    
        {/* break-all whitespace-pre-line  [&>p]:mb-2 */}

            {isEmptyContent(currentTweet)&& (
                <div className="p-0 mt-2">
                <Skeleton count={1} height={8} className="block bg-gray-300 -mb-3 "/>
                <Skeleton count={1} height={8} className="block bg-gray-300 -mb-3 "/>
                <Skeleton count={1} height={8} className="block bg-gray-300 -mb-3 w-1/2"/>
                </div>
            )}

            </div>

            <div className={`mt-2 grid gap-1 ${gridClass} `} id="media">
               {currentPostMedia.map((file, index) => (
                      
                      
                      <Image
                      key={index}
                      src={file.fileURL}
                      alt="media preview"
                      title="twitter image"
                      width={500}
                      height={500}
                      className={`
                        w-full h-full rounded-lg 
                        ${currentPostMedia.length === 1 ? '' : 'aspect-square'} 
                        ${currentPostMedia.length === 3 && index === 0 ? "row-span-2" : ""}
                      `}
                    />

                        
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

      {previewClaim && (

<div className="" id="claim">
<div className="flex items-center gap-1  mx-auto text-center justify-center">
  <FaXTwitter size={24} className="my-4 " />
  <span className="text-lg text-gray-800 dark:text-white">Preview</span>
</div>

<p className="text-gray-500 dark:text-white text-xs text-center w-full px-4 mx-auto -mt-2">
  Social media platforms often update their formatting, which may cause
  your posts to appear slightly different once published.
</p>
</div>
      )}
   

  
    </div>
  );
};

export default PreviewTweet;
