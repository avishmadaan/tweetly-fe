import React, { useRef, useState } from 'react'
import Popup from './ui/popup'
import Input from './ui/input'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { UseBrain } from '@/lib/brainContext';
import Link from 'next/link';

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
   className='w-[500px]'
   >
    <h1 className="text-2xl font-semibold flex gap-2 items-center"> Add Your Favourite Tweet Here</h1>
    <p className="text-sm opacity-40">Click on the share button on tweet in twitter and paste is here</p>
   
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
    className='mt-6 bg-customBlue dark:bg-customBlue cursor-pointer'
    onClick={addTweetToBrain}
    loading={loading}
    startIcon={<Plus size={20} className='' />}
    >
      Add To Brain
    </Button>

   </Popup>
  )
}

export default AddContentPopup
