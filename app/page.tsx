"use client"

import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  const router = useRouter();
  const {isAuthenticated}= useAuth()

  useEffect(() => {

    if(isAuthenticated) {
      router.push("/dashboard/home");
    }
    else {
      
      router.push("/login");
    }
  
  })
  return (
    <div className=""></div>
  );
}
