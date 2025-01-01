"use client";
import { CircleX } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Notification = {
  message: string;
  type: "positive" | "negative";
};
type NotificationInserted = {
  message: string;
  type: "positive" | "negative";
  id:string
};

type NotificationContextType = {
  showNotification: (notification: Notification) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {

  const [notifications, setNotifications] = useState<NotificationInserted[] >([]);

  const showNotification = (notification: Notification) => {
    const newNotification = {...notification, id:uuidv4()} 

    setNotifications((prev) => [...prev, newNotification]);

   setTimeout(() => {
    setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
    }, 5000);

  };


  const closeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {
      
      notifications.map((item) => {

        return (
          <Notification key={item.id} 
          {...item}  closeNotification={() => closeNotification(item.id)} />

        )
      })
      }
      
    </NotificationContext.Provider>
  );
};

type NotificationProps = Notification & {
    closeNotification:() => void
}

export const Notification = ({ message, type, closeNotification }: NotificationProps) => {
  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white z-50 flex gap-2 ${
        type === "positive" ? "bg-customBlue" : "bg-red-500"
      }`}
    >
      <h1>{message}</h1>
      <CircleX className="cursor-pointer " onClick={closeNotification} />
    </div>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
