"use client"
import AddContentPopup from '@/components/add-content-popup'
import MasonryLayout from '@/components/masonry-layout'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import ToolTip from '@/components/ui/tooltip'
import { UseBrain } from '@/lib/brainContext'
import {  Plus, Search } from 'lucide-react'
import React, { useRef, useState } from 'react'

const BrainView = () => {

    const [addContentBox, setAddContentBox] = useState<boolean>(false);
      const{filteredTweets, filterBasedOnSearch} =  UseBrain();
      const searchRef = useRef<HTMLInputElement>(null);

  return (
   <div className='w-full' id='aibrain'>
        <div className="flex justify-between items-center mb-8 w-full ">
        <h2 className="font-semibold text-2xl flex items-center gap-2">Your Saved Tweets

          <ToolTip>This is your brain where you can store any twitter related post here which you can refer anytime later power by Ai.</ToolTip>
        </h2>

        <div className="flex items-center gap-4" id="buttons">

          <Input
          ref={searchRef}
          onChange={() => filterBasedOnSearch(searchRef.current?.value || "")}
          startIcon={<Search size={20} />}
          className='border  p-2  rounded-md pr-10'
          type='text'
          placeholder='Search Your Tweets'

          />


        <Button
          className='text-sm '
          startIcon={<Plus size={16} />}
          variant='primary'
          onClick={() => setAddContentBox(!addContentBox)}
          >
          Add Content
          </Button>

          {addContentBox && (
            <AddContentPopup
            closePopup={setAddContentBox}
            />
          )}

        </div>
          </div>

          <div className="w-full" id="content">
        
            <MasonryLayout items={filteredTweets} />

        
          </div>
      
    </div>
  )
}

export default BrainView
