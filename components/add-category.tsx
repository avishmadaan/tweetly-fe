import React, { useState } from 'react'
import Popup from './ui/popup'
import Input from './ui/input'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { UseBrain } from '@/lib/brainContext';
import { BiCategory } from "react-icons/bi";
import ToolTip from './ui/tooltip';

const AddCategoryPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {

  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {saveCategoryToBrain} = UseBrain();

  const addCategory = async () => {
// https://x.com/elonmusk/status/1873611002866250176
    setLoading(true);
   const result = await  saveCategoryToBrain(category);
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
      <BiCategory
      size={24}
      />
      
      <h1 className="text-2xl font-semibold">Add Your Favourite Tweet Here</h1>
      <ToolTip>You can use these cateorgies to organize your tweets better.</ToolTip>
      
      </div>
      
      <div className="mt-4 px-6 my-4 flex-grow pb-4" id="contentInside">

    <Input
    className='mt-4'
    type='url'
    name='url'
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    placeholder='Enter Category Name..'
    />

    <Button
    variant='primary'
    className={`mt-6 bg-customBlue dark:bg-customBlue w-full `}
    onClick={addCategory}
    loading={loading}
    startIcon={<Plus size={20} className='' />}
    disabled={category.length===0}
    >
      Add Category To Brain
    </Button>
    </div>

   </Popup>
  )
}

export default AddCategoryPopup
