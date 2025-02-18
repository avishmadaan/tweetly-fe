"use client"
import React, {  useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Input from "./ui/input";
import {  SendHorizonal } from "lucide-react";
import { useNotification } from "./notification/notificationContext";
import QuickQuestions from "./quick-questions";
import { Message, UseAi } from "@/lib/aiContext";
import Image from "next/image";


const ChatWithBot = () => {
  const {showNotification} = useNotification();

  // const {selectedBot, openAiKey} = UseAi();
  const messageRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const {selectedBot, getAssistantReply, chats, setChats} = UseAi();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats]);

  

  const handleSendMessage = async (e) => {
    setLoading(true)
      e.preventDefault();
    if(!input.trim()) {
            showNotification({
        message:"Empty Input",
        type:"negative"
      })
      setLoading(false);
      return ;

    }
    const newMessage: Message = { role: "user", content: input };
    const newChats = [...chats, newMessage ];
    
    setChats(newChats);
    setInput("");

    await getAssistantReply(newChats, setChats);
    setLoading(false);
  }

  const getQuickQuestionReply = async (text:string) => {
    setLoading(true);
    const newMessage: Message = { role: "user", content: text };
    const newChats = [newMessage, ...chats ];
    setChats(newChats);
    setInput("");

    await getAssistantReply(newChats, setChats);
    setLoading(false);

  }

  


  return (
    <div className="border flex-1 rounded-md flex flex-col  shadow-md w-full h-full  overflow-hidden ">

      <div className="flex border-b items-center justify-center p-4 w-full dark:bg-black bg-white h-16" >
        <h1 className="font-semibold  flex gap-2 items-center">
        Selected Bot: 
          <div className="dark:bg-gray-800 bg-gray-100 p-1 px-2 rounded-md flex gap-2 items-center">
            {selectedBot?.imageURL && (
              <Image width={24} height={24} src={selectedBot?.imageURL} alt="profilepic" className="rounded-full" />
            )}
            
            <p className="">
              
              {selectedBot?.name}
              </p>
              </div>
            </h1>
            
      </div>  

   
      <div className="flex flex-col   items-start p-4  h-full  overflow-auto relative" ref={messagesEndRef} id="chats"
      >

        {chats.length == 0 && (
          <div className=" absolute  top-1/2 -translate-y-1/2 " >
          <QuickQuestions getQuickQuestionReply={getQuickQuestionReply} />
          </div>
        )}

        {chats.map((chat, index) => (

          <span 
          key={index}
          className={`${chat.role == "user"?"self-end":"self-start"} p-3 bg-customBlue text-white rounded-lg mt-2 text-sm max-w-[50%] whitespace-pre-line `}>
            {chat.content}
            </span>
  
        ))}

        {/* {loading &&  <span 
          
          className={` "self-start" p-3 bg-customBlue text-white rounded-lg mt-2 text-sm max-w-[50%] whitespace-pre-line `}>
            <Loader2 className="animate-spin" />
            </span>} */}

      </div>


      <div  id="input">
      <form className="border-t h-[80px] p-4 relative w-full flex gap-4 items-center " onSubmit={handleSendMessage}>
        <div className="w-[90%] p-0">
          
        <Input
        ref={messageRef}
        value={input}
            type="text h-full"
            placeholder="Ask me anything..."
            className=""
            onChange={(e) => {
                setInput(e.target.value)
            }}
            // onClick={(event) => {
            //   console.log(event)
            // }}
            // onKeyDown={(event) => {
            //   if(event.key == "Enter") {
            //     onMessage()

            //   }

            // }}
          />
        </div>
        

          <Button
            variant="primary"
            className="py-[10px]  "
            endIcon={<SendHorizonal size={16} />}
            loading={loading}
            type="submit"
          >
            Send
          </Button>
          </form>
 
      </div>
    </div>
  );
};

export default ChatWithBot;
