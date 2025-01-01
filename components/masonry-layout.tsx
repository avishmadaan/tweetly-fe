"use client"
import React, { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';
import { FaTrash } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import AreYouSure from './are-you-sure';
import ReactPaginate from 'react-paginate';
import { UseBrain } from '@/lib/brainContext';
import CategoryItem from './category-item';
import {  Tag } from 'lucide-react';
import CategoryChangePopup from './category-change';

type items = {
    tweetId:string
    id:string
    category:{
      name:string
    }
}

const MasonryLayout = ({ items }:{items:items[]}) => {
  const{deleteUserSavedTweet, savedCategories} =  UseBrain();
const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
const [categoryChangeBox, setCategoryChange] = useState<boolean>(false);
const [deleteTweetId, setDeleteTweetId] = useState<string>("");
const [categoryChangeTweetId, setCategoryChangeTweetId] = useState<string>("");
const [currentPage, setCurrentPage] = useState<number>(0);
const itemsPerPage = 12;



const handlePageClick = (event:{selected:number}) => {
    setCurrentPage(event.selected);

}

const itemsToShow = items.slice(
    currentPage *itemsPerPage,
    (currentPage+1)*itemsPerPage
)

    const deleteTweet = () => {

        deleteUserSavedTweet(deleteTweetId);
        console.log("Delete Called")

    }

useEffect(() => {
  setCurrentPage(0);

}, [items])

    

  return (
    <div className="w-full">

      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <CategoryItem id='all' name={"All"} />
        {savedCategories.map((category, index) => (
          <CategoryItem key={index} name={category.name} id={category.id} />
        ))}
      </div> 

      <div className="mt-6" id='nothing'>
            {itemsToShow.length == 0  && (
                      <p className="">There are no saved tweets in this category, choose another category or select All.</p>
                    )}
        

      </div>
    <div className=" columns-1 md:columns-2 lg:columns-3  gap-4 text-wrap">
      {itemsToShow.map((item, index) => (
        <div
          key={index}
          className="group break-inside-avoid rounded-lg shadow-md relative "
      
        >
          <Tweet id={item.tweetId} />

          <div className="absolute top-4 right-4  opacity-0 group-hover:opacity-100 transition-opacity duration-400    text-white 
           flex flex-col gap-2 items-end"
          >

<span title='Tweet Category' className='text-xs bg-black p-2  rounded-md shadow-lg flex gap-2 items-center'><Tag size={12}/>{item.category?.name || "All"}</span>

                   <FaTrash  title="Delete Tweet" className='bg-black p-2 cursor-pointer rounded-md shadow-lg hover:-translate-y-1 duration-200 hover:bg-red-500' size={32} onClick={() => {
                    setDeleteTweetId(item.id)
                    setDeleteConfirm(val => !val)}} />

                    <GoPencil title="Edit Tweet" className='bg-black p-2 cursor-pointer rounded-md shadow-lg hover:-translate-y-1 duration-200 hover:bg-customBlue' size={32}
                    onClick={() => {
                      setCategoryChange(val => !val);
                      setCategoryChangeTweetId(item.id);
                    }}
                    />

                 
            

          </div>
            
             

        </div>
      ))}
      </div>
      <div className="flex justify-center py-8 ">
        {items.length >0  &&(
            <ReactPaginate
            className="flex items-center space-x-2 text-sm font-medium" 
            pageCount={Math.ceil(items.length / itemsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={3}
            onPageChange={handlePageClick}
            previousLabel={
              <span className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">Previous</span>
            }
            nextLabel={
              <span className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">Next</span>
            }
            breakLabel={"..."}
            containerClassName="flex gap-2 mt-4" 
            pageClassName="flex justify-center items-center w-8 h-8 rounded-md " 
            activeClassName="bg-blue-500 text-white" 
            previousClassName="flex justify-center items-center" 
            nextClassName="flex justify-center items-center" 
            breakClassName="flex justify-center items-center w-8 h-8" 
          />

        )}

      
      </div>


{deleteConfirm && (
        <AreYouSure closePopup={setDeleteConfirm} confirmFunction={deleteTweet} description="Are you sure you want to delete this post from your twitter brain?" className="w-1/3 max-w-[500px]" />
      )}

{categoryChangeBox && (
        <CategoryChangePopup closePopup={setCategoryChange} categoryChangeTweetId={categoryChangeTweetId}   className="w-1/2 max-w-[500px]" />
      )}
    
    </div>
  );
};

export default MasonryLayout;
