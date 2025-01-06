import DraftPostMenu from '@/components/draft-post-menu'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import React from 'react'

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

const showTweetContent = (text:string) => {

  if(text.length <80) {
    return text;
  }
  else {
    return text.slice(0,81).concat("...");
  }


}

const Drafts = () => {
  return (
    <div className=' flex flex-col w-full h-full' id='publish'>

    <div className="flex  items-center gap-2" id="top">

    <h1 className="text-2xl font-semibold">Draft Posts</h1>
    <ToolTip>This page will show you all your saved drafts posts you have saved till date.</ToolTip>

    </div>

    <div className="my-6" id="drafts">

      {posts.length ===0 ? (
        <div className="">
          There are no drafts post saved...
        </div>

      ):(


   

      <table className="w-full">

      <thead className='p-2 '>
        <tr className="w-full flex  font-semibold">
          <th className='p-4 w-[40%] font-semibold self-center text-left'>Content</th>
          <th className='p-4 w-[20%] font-semibold self-center'>Date Created</th>
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

      >
      Use Draft

      </Button>
      
      
      </td>
    <td className="p-4 w-[5%] text-center self-center">

 
   <DraftPostMenu />
      
      
      </td>


          </tr>



        ))}



      </tbody>

      </table>
         )}
    </div>



    </div>
  )
}

export default Drafts
