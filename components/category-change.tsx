import React, { useRef, useState } from 'react'
import Popup from './ui/popup'
import { UseBrain } from '@/lib/brainContext';
import { Button } from './ui/button';
import { Pen, SquarePen } from 'lucide-react';
import ToolTip from './ui/tooltip';

const CategoryChangePopup = ({ className, closePopup, categoryChangeTweetId}:{
  children?:React.ReactNode,
  className?:string,
  closePopup:React.Dispatch<React.SetStateAction<boolean>>,
  confirmFunction?:() => void,
  categoryChangeTweetId:string
}) => {

      const {savedCategories,changeTweetCategory} = UseBrain();
 const [loading, setLoading] = useState<boolean>(false);
      const categoryRef = useRef<HTMLSelectElement>(null);

      const changeCategory = async () => {
        // https://x.com/elonmusk/status/1873611002866250176
            setLoading(true);
            const categoryChoosedId = categoryRef.current?.value || "";
            
           const result = await  changeTweetCategory(categoryChangeTweetId, categoryChoosedId);
            setLoading(false);
            if(result) {
              closePopup(val => !val);
        
            }
          }

  return (
    <Popup
    closePopup={closePopup}
    className={`${className} ${"p-[0px]  flex flex-col"}`}
    >

      <div className="flex  items-center gap-2 p-6 border-b" id="top">
      <Pen
      size={18}
      />
      
      <h1 className="text-2xl font-semibold">Change Tweet Category</h1>
      <ToolTip>Your can change your category here.</ToolTip>
      
      </div>
      <div className="mt-4 px-6 my-4 flex-grow pb-4" id="contentInside">

<h1 className="text-3xl font-bold text-gray-600 dark:text-white"></h1>
<p className="mt-2 text-gray-500">You can select the category you want for this tweet.</p>

<p className="mt-6 ">Select Category:</p>
    <select ref={categoryRef}  className='mt border  p-2 my-1 w-full rounded-md' title='category' name="category" id="category">
      <option value="" defaultValue={""}>Default (No Category)</option>
      {savedCategories.map((item, index) => (

    <option key={index} value={item.id}>{item.name}</option>
      ))}

    </select>

    <Button
    variant='primary'
    className='mt-6 bg-customBlue dark:bg-customBlue cursor-pointer w-full'
    loading={loading}
    startIcon={<SquarePen size={20} className='' />}
    onClick={changeCategory}
    >
      Change Category
    </Button>

    </div>
    </Popup>
      
   
  )
}

export default CategoryChangePopup
