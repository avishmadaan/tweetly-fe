"use client"
import React, {  useRef, useState } from "react";
import { Button } from "./ui/button";
import Input from "./ui/input";
import { SendHorizonal } from "lucide-react";
import { useNotification } from "./notification/notificationContext";
import { DataAPIClient} from "@datastax/astra-db-ts"
import OpenAI from "openai"

interface Message {
  role: "system" | "user" | "assistant";
  content:string;
}

const ChatWithBot = () => {
  const {showNotification} = useNotification();

  // const {selectedBot, openAiKey} = UseAi();
  const messageRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

//   const onMessage = async () => {

//     if(searchInput == ""){
//       showNotification({
//         message:"Empty Input",
//         type:"negative"
//       })
//       return ;


//     }
//     const newChat = [ {
//       content:searchInput ,
//      role:"user"
//    }, ...chats]

 
//    const result = await llm.invoke(newChat);
//    console.log(result);
//    const responseChat = [ {
//     role:"assistant",
//     content:result.content as string || "test",
   
//  }, ...newChat];
//  console.log(responseChat);
//  setChats(responseChat);
//  setSearchInput("4");
//   }

//   //chatbot
//   const llm = new ChatOpenAI({
//     model: "gpt-4o-mini",
//     temperature: 0,
//     openAIApiKey:openAiKey
//   });


//   const sendLLM = async () => {
//     const result = await llm.invoke([
//       { role: "user", content: "Hi! I'm Bob" },
//       { role: "assistant", content: "Hello Bob! How can I assist you today?" },
//       { role: "user", content: "What's my name?" },
//     ]);
//     console.log(result);

//   }

  //ai lib



 console.log("NEXT_PUBLIC_OPENAI_API_KEY:", process.env.NEXT_PUBLIC_OPENAI_API_KEY);


  const openai = new OpenAI({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser:true
  })
  const client = new DataAPIClient(process.env.NEXT_PUBLIC_ASTRA_DB_APPLICATION_TOKEN)
  const db = client.db(process.env.NEXT_PUBLIC_ASTRA_DB_API_ENDPOINT as string, {namespace:process.env.NEXT_PUBLIC_ASTRA_DB_NAMESPACE})

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
    const newChats = [...chats, newMessage];
    setChats(newChats);
    setInput("");

    await getAssistantReply(chats)
  }

  const getAssistantReply = async (chatHistory: Message[]) => {
    const lastMessage = chatHistory[chatHistory.length - 1]?.content;

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
    }

    let docContext = "";
    try {
      const collection = await db.collection(
        process.env.NEXT_PUBLIC_ASTRA_DB_COLLECTION as string
      );
      const cursor = await collection.find(null, {
        sort: { $vector: embeddingVector },
        limit: 10,
      });
      const documents = await cursor.toArray();
      const docsMap = documents.map((doc: any) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch (err) {
      console.error("Error querying Astra DB:", err);
      docContext = "";
    }

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

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{
          "Content-Type":"applicaion/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model:"gpt-4",
          stream:false,
          messages:[systemMessage, ...chatHistory]
        })
      }
      )

      if (!response.ok || !response.body) {
        const errText = await response.text();
        console.error("Error from OpenAI API:", errText);
        showNotification({ message: "Error from OpenAI API", type: "negative" });
        return;
      }

      const result = await response.json();
      const assistantReply = result.choices[0].message.content;
  
      // Update chat state with the complete assistant reply.
      setChats((prevChats) => [...prevChats, { role: "assistant", content: assistantReply }]);

    }
    catch(err) {
      console.error("Error during chat completion:", err);
      showNotification({
        message: "Error during chat completion",
        type: "negative",
      });

    }


  }





  return (
    <div className="border flex-1 rounded-md flex flex-col  shadow-md w-full h-full  overflow-hidden ">

      <div className="flex border-b items-center justify-center p-4 w-full dark:bg-black bg-white h-16" >
        <h1 className="font-semibold  flex gap-2 items-center">
            Selected Bot: 
            
            {/* <p className="bg-gray-800 p-1 px-2 rounded-md flex gap-2 items-center">
              {selectedBot?.image}
              {selectedBot?.name}
              </p> */}
            </h1>
      </div>  

   
      <div className="flex flex-col-reverse   items-start p-4   h-full overflow-auto" id="chats">

        {chats.reverse().map((chat, index) => (

          <span 
          key={index}
          className={`${chat.role == "user"?"self-end":"self-start"} p-2 bg-customBlue rounded-md mt-2 text-sm max-w-[50%] whitespace-pre-line break-all `}>
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
