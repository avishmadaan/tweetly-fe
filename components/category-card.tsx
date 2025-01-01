"use client"
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import AreYouSure from './are-you-sure'
import { UseBrain } from '@/lib/brainContext'

type CategoryCardProps = {
    id:string,
    name:string
}

const CategoryCard = ({id, name}:CategoryCardProps) => {
    const {deleteUserSavedCategory} = UseBrain();

const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

const deleteCategory = () => {

    deleteUserSavedCategory(id);
    console.log("Delete Called")

}



  return (
    <div className='w-full border p-4 flex items-center rounded-md justify-between hover:shadow-sm cursor-pointer mb-4'>
       <h3 className="">{name}</h3>
       <Trash  size={20} 
       className='hover:text-red-500 cursor-pointer'
       onClick={() => {
        setDeleteConfirm(val => !val)}}
       />

{deleteConfirm && (
        <AreYouSure closePopup={setDeleteConfirm} confirmFunction={deleteCategory} description="Tweets saved in this category will not be deleted." className="w-1/3 max-w-[500px]" />
      )}
      
    </div>
  )
}

export default CategoryCard
