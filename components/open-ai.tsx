"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CircleCheck, CircleX } from "lucide-react";
import { PiOpenAiLogoThin } from "react-icons/pi";
import Input from "./ui/input";
import { UseAi } from "@/lib/aiContext";
import { useNotification } from "./notification/notificationContext";
import ToolTip from "./ui/tooltip";

const OpenAiIntegration = () => {
  const apiKeyRef = useRef(null);

  const { checkValidAPI, isKeyAuthenticated, removeApiKey, openAiKey, setOpenAiKey } = UseAi();
  const [loading, setLoading] = useState<boolean>(false);
     const {showNotification} = useNotification();

  useEffect(() => {
 //@ts-expect-error because of the Input
    apiKeyRef.current.value = openAiKey;
    console.log("here is the key comming :"+openAiKey);
  }, [openAiKey])

  const ValidateAPIKey = async () => {
    //@ts-expect-error because of the Input
    const key = apiKeyRef.current?.value;
    if(!key) {
      showNotification({
        message:"Empty Input",
        type:"negative"
      })
      return;
    }
    setLoading(true);

    console.log("Checking API Key");
    
   
    console.log("sending key :"+key)
    const response = await checkValidAPI(key);

    if(response) {
      showNotification({
        message:"API Key Added Successfully",
        type:"positive"
      })
      localStorage.setItem("openAiAuth", key);
      setOpenAiKey(key);
    }
    setLoading(false);
  };


  return (
    <div 
    className=" max-w-1/3 border p-6 rounded-md relative flex flex-col min-h-[400px] "
    >
      <div className="tooltip absolute right-4 ">

      <ToolTip>Enter your OpenApi Key. Access it from here <a rel="noopener" className="underline" target="_blank" href="https://platform.openai.com/settings/organization/api-keys">Access Here</a></ToolTip>

      </div>
      <div className="text-gray-500 flex gap-2 items-center">
        {isKeyAuthenticated ? (
          <p className="flex gap-2 items-center text-customBlue">
            <CircleCheck className="" size={20} />
            Connected Successfully
          </p>
        ) : (
          <div className="flex gap-2 items-center text-red-500">
            <CircleX className="" size={20} />
            Not Connected
          </div>
        )}
      </div>
      <PiOpenAiLogoThin size={100} className="my-4" />
      <h1 className="text-2xl font-bold py-2 ">Enter Your OpenAi Api Key</h1>
      <p className="dark:text-gray-300 text-gray-500 text-sm pb-2">
       Your API key is secure in your browser only, it does not go outside.
      </p>

      <Input
        ref={apiKeyRef}
        type="text"
        placeholder="Enter Your Secret Key Here"
        disabled={isKeyAuthenticated}
        className={` ${isKeyAuthenticated && "cursor-not-allowed"}`}
        
      />

      <div className="mt-6" id="buttons">

      {isKeyAuthenticated ? (
        <Button
          variant="primary"
          className="bg-red-500 dark:!bg-red-500 dark:text-white w-full  bg-opacity-100 mt-auto"
          onClick={removeApiKey}
          loading={loading}
        >
          <CircleX size={24} /> Disconnect
        </Button>
      ) : (
        <Button
          variant="primary"
          className="flex items-center my-2 w-full mt-4"
          onClick={ValidateAPIKey}
          loading={loading}
        >
          <PiOpenAiLogoThin size={24} /> Connect Your Account
        </Button>
      )}
      </div>

      
    </div>
  );
};

export default OpenAiIntegration;
