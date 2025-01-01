import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import { EllipsisVertical } from 'lucide-react'
import React from 'react'

const posts = [
  {
    content:"This is just a display test, and this is what its going to showing as a preview in the frontend This page will show you all your saved drafts posts you have saved till date.",
    dateCreated:"12th Jan",
    media:"yes"
  },
  {
    content:"This page will show you all your saved drafts posts you have saved.",
    dateCreated:"20th March",
    media:"no"
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

    <div className="mt-6" id="drafts">

      <table className="w-full">

      <thead className='border-b p-2 '>
        <tr className="w-full flex  font-semibold">
          <th className='p-4 w-[40%] font-semibold self-center text-left'>Content</th>
          <th className='p-4 w-[20%] font-semibold self-center'>Date Created</th>
          <th className='p-4 w-[15%] font-semibold self-center'>Media</th>
        </tr>
      </thead>
      <tbody className=''>

        {posts.map((item,index) => (

          <tr key={index} className="flex flex-wrap border-b py-2">

<td className="p-4 w-[40%] text-left self-center">
     {showTweetContent(item.content)}
    </td>

    <td className="p-4 w-[20%] text-center self-center">{item.dateCreated}</td>

    <td className="p-4 w-[15%] text-center self-center">{item.media}</td>

    <td className="p-4 w-[20%] text-center self-center">

      <Button
      variant='primary'
      className='text-sm bg-customBlue dark:bg-customBlue'

      >
      Use Draft

      </Button>
      
      
      </td>
    <td className="p-4 w-[5%] text-center self-center">

  <EllipsisVertical
   className='cursor-pointer'
   size={24} 
   />
      
      
      </td>


          </tr>



        ))}



      </tbody>

      </table>
    </div>



    </div>
  )
}

export default Drafts
