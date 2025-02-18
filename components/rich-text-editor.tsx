"use client";
import React, { useEffect, useRef, useState } from "react";
import { UseX } from "@/lib/xContext";
import { SmilePlus, Trash2, ImageIcon, TriangleAlert } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import AreYouSure from "./are-you-sure";
import ToolTip from "./ui/tooltip";
import AddMediaPopup from "./add-media";
import { FaMagic } from "react-icons/fa";
import TweetlyIntelligencePopup from "./tweetly-intelligence-post";


const RichTextEditor = ({ className }: { className: string }) => {
  const { setCurrentTweet , currentTweet, setCurrentPostMedia} = UseX();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [addMedia, setAddMedia] = useState<boolean>(false);
  const [tweetlyIntelligence, setTweetlyIntelligence] =useState<boolean>(false);


  useEffect(() => {

    const handleClickOutside = (event:MouseEvent) => {

      if(emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }

    }
    document.addEventListener("mousedown",handleClickOutside);

    return ()=> {
      document.removeEventListener("mousedown", handleClickOutside);
    }

  }, [])


  const addEmoji = (emojiObject: EmojiClickData) => {
    setCurrentTweet((val) => val.concat(emojiObject.emoji))
  };


  const clearTextAndMedia = () => {

  setCurrentTweet("");
  setCurrentPostMedia([]);

  }

  return (
    <div
      className={`border rounded-md p-4  flex flex-col w-full  cursor-text ${className} `}
    >


      {/* Editor */}
      <div className="flex-grow p-2 relative">


        <textarea
        className={`p-2 rounded-md w-full focus:outline-none  whitespace-pre-wrap h-full dark:bg-transparent`}
        value={currentTweet}
        onChange={(e) => setCurrentTweet(e.target.value)}
        placeholder="What's on your mind? Let's share this with others..."
        />



      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mt-2 justify-between">
        <div className="flex gap-4 items-center" id="options">
          <div className="relative" id="emoji">
            {" "}

  
              <SmilePlus
              size={20}
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
              />

{showEmojiPicker && (
  <div 
  ref={emojiRef}
    className="absolute z-50 shadow-md left-[130%] top-0 -translate-y-1/2"
    
  >
    <EmojiPicker 
    width={300} 
    height={400} 
    onEmojiClick={addEmoji}
    className="dark:bg-black "

    
    />
  </div>
)}
          </div>
            <ImageIcon
            size={20}
            onClick={() => setAddMedia(!addMedia)}
            className="text-gray-500 cursor-pointer"
          

            
            />
            {addMedia && (
              <AddMediaPopup closePopup={setAddMedia} />
            )

            }

            <div className="rounded-md border px-4 py-[8px] flex gap-2 items-center hover:border-customBlue group cursor-pointer"
            onClick={() => setTweetlyIntelligence(val => !val)}
            >
            <FaMagic
            size={18}
            title="Tweetly Intelligence"
            className="text-gray-500 cursor-pointer group-hover:text-customBlue"
            onClick={() => setTweetlyIntelligence(val => !val)}
            />
            <p className="text-[12px] text-gray-500 group-hover:text-customBlue">
            Let Bots Write Tweet

            </p>

            </div>

           
            {
              tweetlyIntelligence && (
                <TweetlyIntelligencePopup
                closePopup={setTweetlyIntelligence}
                />
              )
            }
      
        </div>

        <div className="flex gap-4 items-center" id="delete">

<ToolTip >
  Word limit for normal X users is 280 characters including hashtags and emoji takes 2 characters.

</ToolTip>
<p className={`text-red-500 text-sm flex items-center gap-2 
          ${(currentTweet.length 
          || 1)>280?"block":"hidden"}`}>
            <TriangleAlert size={16} />
            Upto 280 Characters Allowed</p>


          <p className={`
          ${(currentTweet.length 
          || 1)>280?"text-red-500":""}`}>
            {currentTweet.length}

            
            </p>


            <Trash2
            className="text-red-500 cursor-pointer" 
            onClick={() =>setDeleteConfirm(!deleteConfirm)}
            size={20}
            />
      
        </div>
      </div>

      {deleteConfirm && (
        <AreYouSure closePopup={setDeleteConfirm} confirmFunction={clearTextAndMedia} description="Are you sure you want to clear the text and/or attachments of the post?" className="w-1/3 max-w-[500px]" />
      )}
    </div>
  );
};

export default RichTextEditor;
