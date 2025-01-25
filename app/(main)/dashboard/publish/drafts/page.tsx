"use client"
import AreYouSure from '@/components/are-you-sure'
import DraftPostMenu from '@/components/draft-post-menu'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import { UseX } from '@/lib/xContext'
import { Eye, Loader2, Trash2 } from 'lucide-react'
import React, {  useEffect, useRef, useState } from 'react'


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

    <div className="my-6" id="drafts">

      

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

        {draftPosts.map((item,index) => (

          <tr key={index} className="flex flex-wrap border-t py-2">

<td className="p-4 w-[40%] text-left self-center">
     {showTweetContent(item.postContent)}
    </td>

    <td className="p-4 w-[20%] text-center self-center">{item.updatedAt}</td>

    <td className="p-4 w-[15%] text-center self-center">{item.file.length}</td>

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

    {useDraftPopup && (
        <AreYouSure closePopup={setUseDraftPopup} confirmFunction={() => {usingDraft(useDraftPostId)}} description="You already have a tweet in your editor, this will override that and show that in editor. If you want you can save that as draft and then use this." className="w-1/3 max-w-[500px]" />
      )}



    </div>
  )
}

export default Drafts
