"use client"
import AddCategoryPopup from '@/components/add-category';
import CategoryCard from '@/components/category-card';
import { Button } from '@/components/ui/button';
import ToolTip from '@/components/ui/tooltip';
import { UseBrain } from '@/lib/brainContext';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

const Categories = () => {
  const [addCategoryBox, setAddCategoryBox] = useState<boolean>(false);

  const {savedCategories} = UseBrain();


  return (
    <div className=''>
      <div className="flex justify-between items-center mb-8 w-full ">
        <h2 className="font-semibold text-2xl flex items-center gap-2">Your Categories

          <ToolTip>These are categories created by you.</ToolTip>
        </h2>

        <Button
          className='text-sm'
          startIcon={<Plus size={16} />}
          variant='primary'
          onClick={() => setAddCategoryBox(!addCategoryBox)}
          >
          Add Category
          </Button>

          {addCategoryBox && (
            <AddCategoryPopup
            closePopup={setAddCategoryBox}
            />
          )}
          </div>

          <div className="w-full pb-6" id="content">
            {savedCategories.length == 0  && (
              <p className="">There are no categories...</p>
            )}
            {savedCategories.map((item, index) => (
              <CategoryCard
              key={index}
              id={item.id}
              name={item.name}
              />

            ))}

            

        
          </div>
      
    </div>
  )
}

export default Categories
