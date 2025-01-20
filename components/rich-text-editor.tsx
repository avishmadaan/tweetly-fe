"use client";
import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { UseX } from "@/lib/xContext";
import { SmilePlus, Trash2, ImageIcon, WandSparkles } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import AreYouSure from "./are-you-sure";
import ToolTip from "./ui/tooltip";
import AddMediaPopup from "./add-media";
import HardBreak from '@tiptap/extension-hard-break';
import { FaMagic } from "react-icons/fa";
import TweetlyIntelligencePopup from "./tweetly-intelligence-post";


const RichTextEditor = ({ className }: { className: string }) => {
  const { setCurrentTweet, currentTweet } = UseX();
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
    editor?.commands.insertContent(emojiObject.emoji);
  };

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline, Link, HardBreak],
    content: currentTweet,
    onUpdate: ({ editor }) => setCurrentTweet(editor.getHTML()),
  });

  const clearText = () => {

  editor?.commands.clearContent();
  setCurrentTweet("");

  }

  return (
    <div
      className={`border rounded-md p-4  flex flex-col w-full  cursor-text ${className} `}
      onClick={() => editor?.commands.focus()}
    >
      {/* Editor */}
      <div className="flex-grow p-2 relative">

        {!editor?.getText() && (
          <p className={`absolute top-2 left-2 text-gray-400 italic pointer-events-none`}>
            What&apos;s on you mind? Lets share this with others...
          </p>
        )}

        {/* Editor Input */}
        <EditorContent 
        editor={editor} 
        className="font-normal min-h-[150px]  " 
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
    <EmojiPicker width={300} height={400} onEmojiClick={addEmoji} />
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
            <FaMagic
            size={18}
            title="Tweetly Intelligence"
            className="text-gray-500 cursor-pointer hover:text-customBlue"
            onClick={() => setTweetlyIntelligence(val => !val)}
            />
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
          <p className="text-md">{editor?.getText().length}</p>


            <Trash2
            className="text-red-500 cursor-pointer" 
            onClick={() =>setDeleteConfirm(!deleteConfirm)}
            size={20}
      
            />
      
        </div>
      </div>

      {deleteConfirm && (
        <AreYouSure closePopup={setDeleteConfirm} confirmFunction={clearText} description="Are you sure you want to clear the text and/or attachments of the post?" className="w-1/3 max-w-[500px]" />
      )}
    </div>
  );
};

export default RichTextEditor;
