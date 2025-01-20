import React, { useRef, useState } from 'react'
import Popup from './ui/popup'
import Input from './ui/input'
import { Button } from './ui/button';
import { CirclePlus, Plus } from 'lucide-react';
import { UseBrain } from '@/lib/brainContext';
import Link from 'next/link';
import ToolTip from './ui/tooltip';

const AddContentPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [tweetUrl, setTweetUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {saveTweetToBrain, savedCategories} = UseBrain();
  const categoryRef = useRef<HTMLSelectElement>(null);

  const addTweetToBrain = async () => {
// https://x.com/elonmusk/status/1873611002866250176
    setLoading(true);
    const categoryChoosedId = categoryRef.current?.value;
    console.log("categoryChoosedId",categoryChoosedId)
   const result = await  saveTweetToBrain(tweetUrl, categoryChoosedId || "");
    setLoading(false);
    if(result) {
      closePopup(val => !val);

    }
  }


  return (
   <Popup
   closePopup={closePopup}
   className={` ${"p-[0px]  flex flex-col w-[500px]"}`}
   >

<div className="flex  items-center gap-2 p-6 border-b" id="top">
      <CirclePlus
      size={18}
      />
      
      <h1 className="text-2xl font-semibold">Add Your Favourite Tweet Here</h1>
      <ToolTip>Click on the share button on tweet in twitter and paste is here.</ToolTip>
      
      </div>
      <div className="mt-0 px-6 my-4 flex-grow pb-4" id="contentInside">
   
    <p className="mt-6 ">Tweet Link:</p>
    <Input
    className=''
    type='url'
    name='url'
    value={tweetUrl}
    onChange={(e) => setTweetUrl(e.target.value)}
    placeholder='Enter Tweet Share Link here'
    />

<p className="mt-6 ">Select Category:</p>
    <select ref={categoryRef} className='mt border  p-2 my-1 w-full rounded-md' title='category' name="category" id="category">
      <option value="" defaultValue={""}>Default (No Category)</option>
      {savedCategories.map((item, index) => (

    <option key={index} value={item.id}>{item.name}</option>
      ))}

    </select>

    <p className="text-sm p-1 mt-1 dark:text-gray-300 text-gray-500">Create New Category  
      <Link href={"/dashboard/brain/categories"}>
      <span className='underline ml-1 text-customBlue' >Here</span>
      </Link>
      </p>

    <Button
    variant='primary'
    className='mt-6 bg-customBlue dark:bg-customBlue cursor-pointer w-full' 
    onClick={addTweetToBrain}
    loading={loading}
    startIcon={<Plus size={20} className='' />}
    >
      Add To Brain
    </Button>

    </div>
   </Popup>
  )
}

export default AddContentPopup
