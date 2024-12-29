"use client"
import AddContentPopup from '@/components/add-content-popup'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import {  Plus } from 'lucide-react'
import React, { useState } from 'react'

const AiBrain = () => {

  const [addContentBox, setAddContentBox] = useState<boolean>(false);

  return (
    <div className='w-full' id='aibrain'>
        <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="font-semibold text-2xl flex items-center gap-2">Ai Brain

          <ToolTip>This is your brain where you can store any twitter related post here which you can refer anytime later power by Ai.</ToolTip>
        </h2>

        <Button
          className='text-sm'
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
  )
}

export default AiBrain
