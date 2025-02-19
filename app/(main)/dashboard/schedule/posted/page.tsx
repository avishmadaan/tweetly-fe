"use client"

import TweetPreviewPopup from '@/components/tweet-preview-popup'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import {  Eye, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaTwitter } from "react-icons/fa";
import {  format } from "date-fns";
import { PostsType, UseX } from '@/lib/xContext'
import ReactPaginate from 'react-paginate'
import { UseAi } from '@/lib/aiContext'

const showTweetContent = (text:string) => {

  if(text.length <80) {
    return text;
  }
  else {
    return text.slice(0,81).concat("...");
  }

}

const Posted = () => {



  const [previewPopup, setPreviewPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<PostsType |null>(null);


    const {fetchAllPublished,publishedPosts } = UseX();
    const {Xdata} =UseAi();
     const [currentPage, setCurrentPage] = useState<number>(0);
     const itemsPerPage = 5;


const handlePageClick = (event:{selected:number}) => {
  setCurrentPage(event.selected);

}

     const itemsToShow = publishedPosts.slice(
         currentPage *itemsPerPage,
         (currentPage+1)*itemsPerPage
     )
     
       const loadingPublished = async () => {
         setLoading(true);
         await fetchAllPublished();
         console.log(publishedPosts);
         setLoading(false);
       }
     
       useEffect(() => {
        loadingPublished();
       }, [])




  return (
    <div className=' flex flex-col w-full h-full' id='publish'>

        <div className="flex  items-center gap-2" id="top">

        <h1 className="text-2xl font-semibold">Published</h1>
        <ToolTip>This section will show your posts already published.</ToolTip>

        {loading && (
        <Loader2 className='animate-spin' />
      )}


        </div>

        <div className="flex flex-col flex-grow justify-between w-full mt-4" id="main">


      {itemsToShow.length ===0 ? (
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

{itemsToShow.map((item,index) => (

    <tr key={index} className="flex flex-wrap border-t py-2">

<td className="p-4 w-[40%] text-left self-center">
{showTweetContent(item.postContent)}
</td>

<td className="p-4 w-[20%] text-center self-center">{format(item.updatedAt, "dd-MM-yyyy || hh:mm a")}</td>

<td className="p-4 w-[15%] text-center self-center">{item.files.length}</td>

<td className="p-4 w-[20%] text-center self-center">

<Button
variant='primary'
className='text-sm'
startIcon={<Eye />}
onClick={() => {
  setSelectedPost(item)
  setPreviewPopup(true);
}}

>
Preview

</Button>


</td>

<td className="p-4 w-[5%] text-center self-center">

<a href={`http://www.x.com/${Xdata?.username}/status/${item.tweetId}`} target='_blank'>
<FaTwitter
size={24}
title='Visit Tweet On Twitter'
className='cursor-pointer text-customBlue'
target='_blank'
/>
</a>


</td>



    </tr>



  ))}



</tbody>

</table>

      
      )}

        </div>

        {publishedPosts.length >0  &&(
            <ReactPaginate
            className="flex items-center justify-center space-x-2 text-sm font-medium mt-auto mb-8 "  
            pageCount={Math.ceil(publishedPosts.length / itemsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={3}
            onPageChange={handlePageClick}
            activeLinkClassName=''
      
            previousLabel={
              <span className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">Previous</span>
            }
            nextLabel={
              <span className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">Next</span>
            }
            breakLabel={"..."}
            containerClassName="flex gap-2 mt-4" 
            pageClassName="flex justify-center items-center w-8 h-8 rounded-md " 
            activeClassName="bg-blue-500 text-white" 
            previousClassName="flex justify-center items-center" 
            nextClassName="flex justify-center items-center" 
            breakClassName="flex justify-center items-center w-8 h-8" 
          />

        )}

{previewPopup && (
          <TweetPreviewPopup
          closePopup={setPreviewPopup}
          className=''
          currentPostMedia={selectedPost?.files || []}
          currentTweet={selectedPost?.postContent || ""}
          />
        )}
</div>
  )
}

export default Posted
