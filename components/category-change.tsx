import React, { useRef, useState } from 'react'
import Popup from './ui/popup'
import { UseBrain } from '@/lib/brainContext';
import { Button } from './ui/button';
import { SquarePen } from 'lucide-react';

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
    className={className}
    >

<h1 className="text-3xl font-bold text-gray-600 dark:text-white">Change Tweet Category</h1>
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
    className='mt-6 bg-customBlue dark:bg-customBlue cursor-pointer'
    loading={loading}
    startIcon={<SquarePen size={20} className='' />}
    onClick={changeCategory}
    >
      Change Category
    </Button>

   
    </Popup>
      
   
  )
}

export default CategoryChangePopup
