"use client"

import { useNotification } from "@/components/notification/notificationContext"
import { Button } from "@/components/ui/button"

export default function Home() {

  const {showNotification} = useNotification();
  return (
    <div>
      <Button onClick={() => {
        showNotification({
          message:"This is good",
          type:"positive"
        })
        console.log("hello")
      }}>Click me</Button>
    </div>
  )
}
