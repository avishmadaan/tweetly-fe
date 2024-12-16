"use client";
import { CircleX, Cross } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

type Notification = {
  message: string;
  type: "positive" | "negative";
};

type NotificationContextType = {
  showNotification: (notification: Notification) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const closeNotification = () => {
    setNotification(null);
  }

  const showNotification = (notification: Notification) => {
    setNotification(notification);

    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Notification {...notification}  closeNotification={closeNotification} />}
    </NotificationContext.Provider>
  );
};

type NotificationProps = Notification & {
    closeNotification:() => void
}

export const Notification = ({ message, type, closeNotification }: NotificationProps) => {
  return (
    <div
      className={`fixed bottom-5 left-5 p-4 rounded-md shadow-lg text-white z-10 flex gap-2 ${
        type === "positive" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <CircleX className="cursor-pointer " onClick={closeNotification} />
      <h1>{message}</h1>
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
