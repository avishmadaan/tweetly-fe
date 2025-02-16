"use client"
import React, {  useRef, useState } from "react";
import { Button } from "./ui/button";
import Input from "./ui/input";
import { SendHorizonal } from "lucide-react";
import { useNotification } from "./notification/notificationContext";
import OpenAI from "openai"
import { domain } from "@/lib/utils";
import axios from "axios";
import QuickQuestions from "./quick-questions";
import { UseAi } from "@/lib/aiContext";
import Image from "next/image";

interface Message {
  role: "system" | "user" | "assistant";
  content:string;
}

const ChatWithBot = () => {
  const {showNotification} = useNotification();

  // const {selectedBot, openAiKey} = UseAi();
  const messageRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const {selectedBot} = UseAi();

  const getContext = async (embeddingVector:number[]) => {

    try {
      const URL = `${domain}/api/v1/user/ai/getcontext`;
      const result = await axios.post(URL,{embeddingVector}, {
        withCredentials:true
      } )
      console.log(result.data)
  
      return result.data.context;

    } catch(err){
      console.log(err);
      showNotification({
        //@ts-expect-error  because of message
        message:e.response.data.message || "Internal Server Error",
        type:"negative"
      })


    }


  }
  const openai = new OpenAI({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser:true
  })


  

  const [chats, setChats] = useState<Message[]>([
  ]);

  const handleSendMessage = async (e) => {

      e.preventDefault();
    if(!input.trim()) {
            showNotification({
        message:"Empty Input",
        type:"negative"
      })
      return ;

    }
    const newMessage: Message = { role: "user", content: input };
    const newChats = [newMessage, ...chats ];
    
    setChats(newChats);
    setInput("");

    await getAssistantReply(newChats)
  }

  const getQuickQuestionReply = async (text:string) => {
    const newMessage: Message = { role: "user", content: text };
    const newChats = [newMessage, ...chats ];
    setChats(newChats);
    setInput("");

    await getAssistantReply(newChats)

  }

  const getAssistantReply = async (chatHistory: Message[]) => {
    setLoading(true);
    console.log(chatHistory);
    const lastMessage = chatHistory[0]?.content;
    console.log(lastMessage);

    let embeddingVector:number[] =[];
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: lastMessage,
        encoding_format: "float",
      });
      embeddingVector = embeddingResponse.data[0].embedding;

    } catch (err) {
      console.error("Error getting embedding:", err);
      showNotification({ message: "Error getting embedding", type: "negative" });
      return;
      setLoading(false);
    } 
    console.log(embeddingVector)

    const docContext = await getContext(embeddingVector);

    const systemMessage: Message = {
      role: "system",
      content: `
You are an AI assistant who knows everything about Formula One.
Use the below context to augment your knowledge about Formula One racing.
The context provides recent page data from Wikipedia, the official F1 website, and others.
If the context doesn't include the needed info, answer based on your existing knowledge without mentioning the source.
Format responses using markdown where applicable and do not return images.

--------
START CONTEXT
${docContext}
END CONTEXT

----
QUESTION: ${lastMessage}
----
      `,
    };

    try {

      const response = await openai.chat.completions.create({
        messages:[...chatHistory, systemMessage ],
        model:"gpt-4"
      })

      const assistantReply = response.choices[0].message.content || "";
  
      // Update chat state with the complete assistant reply.
      setChats((prevChats) => [ { role: "assistant", content: assistantReply},  ...prevChats]);


    }
    catch(err) {
      console.error("Error during chat completion:", err);
      showNotification({
        message: "Error during chat completion",
        type: "negative",
      });

    } finally {
      setLoading(false);
    }


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

   
      <div className="flex flex-col-reverse   items-start p-4   h-full overflow-auto relative" id="chats">

        {chats.length == 0 && (
          <div className=" absolute  top-1/2 -translate-y-1/2 " >
          <QuickQuestions getQuickQuestionReply={getQuickQuestionReply} />
          </div>
        )}

        {chats.reverse().map((chat, index) => (

          <span 
          key={index}
          className={`${chat.role == "user"?"self-end":"self-start"} p-3 bg-customBlue text-white rounded-lg mt-2 text-sm max-w-[50%] whitespace-pre-line `}>
            {chat.content}
            </span>
  
        ))}

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
                setInput(chat => e.target.value)
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
