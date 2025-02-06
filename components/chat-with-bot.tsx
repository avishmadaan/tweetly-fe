"use client"
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import Input from "./ui/input";
import { SendHorizonal } from "lucide-react";
import { UseAi } from "@/lib/aiContext";
import { useNotification } from "./notification/notificationContext";

const ChatWithBot = () => {
  const {showNotification} = useNotification();
  const {selectedBot} = UseAi();
  const messageRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [chats, setChats] = useState([
    {
      type:"user",
      message:"Hello, this is my first message."
    },
    {
      type:"bot",
      message:"How I can help you out"
    }
  ]);

  const onMessage = () => {

    if(searchInput == ""){
      showNotification({
        message:"Empty Input",
        type:"negative"
      })
      return ;


    }
    const newChat = [ {
      message:searchInput ,
     type:"user"
   }, ...chats]

   setChats(newChat);
   setSearchInput("");


  }


  return (
    <div className="border flex-1 rounded-md flex flex-col  shadow-md w-full h-full  overflow-hidden ">

      <div className="flex border-b items-center justify-center p-4 w-full dark:bg-black bg-white h-16" >
        <h1 className="font-semibold  flex gap-2 items-center">
            Selected Bot: 
            
            <p className="bg-gray-800 p-1 px-2 rounded-md flex gap-2 items-center">
              {selectedBot?.image}
              {selectedBot?.name}
              </p>
            </h1>
      </div>  

   
      <div className="flex flex-col-reverse   items-start p-4   h-full overflow-auto" id="chats">

        {chats.map((chat, index) => (

          <span 
          key={index}
          className={`${chat.type == "user"?"self-end":"self-start"} p-2 bg-customBlue rounded-md mt-2 text-sm max-w-[50%] whitespace-pre-line break-all `}>
            {chat.message}
            </span>
  
        ))}

      </div>


      <div className="border-t h-[80px] p-4 relative w-full flex gap-4 items-center " id="input">
        
        <div className="w-[90%] p-0">
        <Input
        ref={messageRef}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        value={searchInput}
            type="text h-full"
            placeholder="Send a message"
            className=""
            onClick={(event) => {
              console.log(event)
            }}
            onKeyDown={(event) => {
              if(event.key == "Enter") {
                onMessage()

              }

            }}
          />
        </div>
        

          <Button
            variant="primary"
            className="py-[10px]  "
            endIcon={<SendHorizonal size={16} />}
            onClick={onMessage}
          >
            Send
          </Button>
 
      </div>
    </div>
  );
};

export default ChatWithBot;
