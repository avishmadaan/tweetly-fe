"use client"

import TweetPreviewPopup from '@/components/tweet-preview-popup'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import {  Eye } from 'lucide-react'
import React, { useState } from 'react'
import { FaTwitter } from "react-icons/fa";

const posts = [
  {
    content: "Exploring the latest advancements in AI and how it impacts everyday life.",
    dateCreated: "15th Jan",
    media: "no"
  },
  {
    content: "Top 10 tips to improve productivity while working remotely in 2024.",
    dateCreated: "20th Jan",
    media: "yes"
  },
  {
    content: "An overview of the new web design trends for modern and responsive websites.",
    dateCreated: "25th Jan",
    media: "yes"
  },
  {
    content: "Breaking down the pros and cons of React vs Angular for frontend development.",
    dateCreated: "1st Feb",
    media: "no"
  },
  {
    content: "The importance of cybersecurity practices to protect personal data online.",
    dateCreated: "5th Feb",
    media: "yes"
  },
  {
    content: "How cloud computing is reshaping the future of businesses and scalability. Explaining the basics of blockchain technology and its potential use cases.",
    dateCreated: "10th Feb",
    media: "no"
  },
  {
    content: "Explaining the basics of blockchain technology and its potential use cases.",
    dateCreated: "15th Feb",
    media: "yes"
  }


]

const Posted = () => {

  const [previewPopup, setPreviewPopup] = useState<boolean>(false);

  const showPreview = () => {
    setPreviewPopup(true);
  }



  const showTweetContent = (text:string) => {

    if(text.length <80) {
      return text;
    }
    else {
      return text.slice(0,81).concat("...");
    }
  
  
  }


  return (
    <div className=' flex flex-col w-full h-full' id='publish'>

        <div className="flex  items-center gap-2" id="top">

        <h1 className="text-2xl font-semibold">Published Posts</h1>
        <ToolTip>This section will show your posts already published.</ToolTip>

        </div>

        <div className="flex flex-col flex-grow justify-between w-full mt-4" id="main">


      {posts.length ===0 ? (
        <div className="">
          There are no drafts post saved...
        </div>
      ):(


       

<table className="w-full">

<thead className='p-2 '>
  <tr className="w-full flex  font-semibold">
    <th className='p-4 w-[40%] font-semibold self-center text-left'>Content</th>
    <th className='p-4 w-[20%] font-semibold self-center '>Published Date</th>
    <th className='p-4 w-[15%] font-semibold self-center'>Media</th>
  </tr>
</thead>
<tbody className=''>

  {posts.map((item,index) => (

    <tr key={index} className="flex flex-wrap border-t py-2">

<td className="p-4 w-[40%] text-left self-center">
{showTweetContent(item.content)}
</td>

<td className="p-4 w-[20%] text-center self-center">{item.dateCreated}</td>

<td className="p-4 w-[15%] text-center self-center">{item.media}</td>

<td className="p-4 w-[20%] text-center self-center">

<Button
variant='primary'
className='text-sm'
startIcon={<Eye />}
onClick={showPreview}

>
Preview

</Button>


</td>

<td className="p-4 w-[5%] text-center self-center">


<FaTwitter
size={24}
title='Visit Tweet On Twitter'
className='cursor-pointer text-customBlue'
href='http://www.x.com'
target='_blank'

/>


</td>
<td className="p-4 w-[5%] text-center self-center">




</td>


    </tr>



  ))}



</tbody>

</table>

      
      )}

        </div>
        {previewPopup && (
          <TweetPreviewPopup
          closePopup={setPreviewPopup}
          className=''
          />
        )}
</div>
  )
}

export default Posted
