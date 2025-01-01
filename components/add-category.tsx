import React, { useState } from 'react'
import Popup from './ui/popup'
import Input from './ui/input'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { UseBrain } from '@/lib/brainContext';

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
   className='w-[500px]'
   >
    <h1 className="text-2xl font-semibold flex gap-2 items-center"> Add Your Category Here</h1>
    <p className="text-sm opacity-40">You can use these cateorgies to organize your tweets better.</p>
   

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
    className={`mt-6 bg-customBlue dark:bg-customBlue  `}
    onClick={addCategory}
    loading={loading}
    startIcon={<Plus size={20} className='' />}
    disabled={category.length===0}
    >
      Add Category To Brain
    </Button>

   </Popup>
  )
}

export default AddCategoryPopup
