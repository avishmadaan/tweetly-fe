"use client"
import AreYouSure from '@/components/are-you-sure'
import DraftPostMenu from '@/components/draft-post-menu'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import { UseX } from '@/lib/xContext'
import { Loader2 } from 'lucide-react'
import React, {  useEffect, useState } from 'react'
import {  format } from "date-fns";
import ReactPaginate from 'react-paginate'


const showTweetContent = (text:string) => {

  if(text.length <80) {
    return text;
  }
  else {
    return text.slice(0,81).concat("...");
  }


}

const Drafts = () => {

  const {fetchAllDrafts,draftPosts, usingDraft, currentTweet, currentPostMedia } = UseX();
  const [loading, setLoading] = useState<boolean>(false);
 const [useDraftPopup, setUseDraftPopup] = useState<boolean>(false);
 const [useDraftPostId, setUseDraftPostId] = useState<string>("");
 const [currentPage, setCurrentPage] = useState<number>(0);
 const itemsPerPage = 5;

 



const handlePageClick = (event:{selected:number}) => {
    setCurrentPage(event.selected);

}

const itemsToShow = draftPosts.slice(
    currentPage *itemsPerPage,
    (currentPage+1)*itemsPerPage
)

  const loadingDrafts = async () => {
    setLoading(true);
    await fetchAllDrafts();
    console.log(draftPosts);
    setLoading(false);
  }

  useEffect(() => {
    loadingDrafts();
  }, [])

  const draftUsage = (id:string) => {
    setUseDraftPostId(id);

    if(currentTweet.length>0 || currentPostMedia.length>0 ) {

      setUseDraftPopup(true);
      return ;
    }

    usingDraft(id);

  }


  return (
    <div className=' flex flex-col w-full h-full' id='publish'>

    <div className="flex  items-center gap-2" id="top">

    <h1 className="text-2xl font-semibold">Draft Posts</h1>
    <ToolTip>This page will show you all your saved drafts posts you have saved till date.</ToolTip>

    {loading && (
        <Loader2 className='animate-spin' />
      )}

    </div>

    <div className="my-6 " id="drafts">

      

      {draftPosts.length ===0 && loading ==false ? (
        <div className="">
          There are no drafts post saved...
        </div>

      ):(



      <table className="w-full">

      <thead className='p-2 '>
        <tr className="w-full flex  font-semibold">
          <th className='p-4 w-[40%] font-semibold self-center text-left'>Content</th>
          <th className='p-4 w-[20%] font-semibold self-center'>Updated At </th>
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

    <td className="p-4 w-[15%] text-center self-center">

      <Button
      variant='primary'
      className='text-sm'
      onClick={() => draftUsage(item.id)}

      >
      Use Draft

      </Button>
      
      
      </td>
    <td className=" w-[10%] text-center self-center flex p-4">
{/* 
           <Eye 
           size={16}
            className='cursor-pointer'
            />

          <Trash2
          size={18}
          className='text-red-500'
           /> */}

 
   <DraftPostMenu post={item} id={item.id} />
      
      
      </td>


          </tr>



        ))}



      </tbody>

      </table>
         )}






    </div>

    {draftPosts.length >0  &&(
            <ReactPaginate
            className="flex items-center justify-center space-x-2 text-sm font-medium mt-auto mb-8 "  
            pageCount={Math.ceil(draftPosts.length / itemsPerPage)}
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

    {useDraftPopup && (
        <AreYouSure closePopup={setUseDraftPopup} confirmFunction={() => {usingDraft(useDraftPostId)}} description="You already have a tweet in your editor, this will override that and show that in editor. If you want you can save that as draft and then use this." className="w-1/3 max-w-[500px]" />
      )}



    </div>
  )
}

export default Drafts
