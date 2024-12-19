
"use client"

import Link from "next/link"

export default function Home() {

  

  

  return (
    <div className="">
      This is home
      <Link href={"/login"}>Login</Link>

      {/* <Button variant="primary" onClick={() => {
        showNotification({
          message:v4(),
          type:"positive"
        })
      }}>Message</Button> */}
  

      
    </div>
  )
}
