
import { UseBrain } from '@/lib/brainContext'
import React from 'react'

type categoryDivProps = {
    name:string,
    id:string
}

const CategoryItem = ({name, id}:categoryDivProps) => {

    const {filterTweets, selectedCategory} = UseBrain();
   


    const onClickCategory = () => {
        console.log("category clicked")
        filterTweets(id);
    }

  return (
    <div 
    className={`p-2  rounded-md cursor-pointer border  ${selectedCategory === id ?"bg-black text-white dark:bg-white dark:text-black ":"hover:bg-gray-100 dark:hover:bg-gray-800"}`}
    onClick={onClickCategory}
    >
        {name}
      
    </div>
  )
}

export default CategoryItem
