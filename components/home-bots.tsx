import React from 'react'
import ToolTip from './ui/tooltip'
import { UseAi } from '@/lib/aiContext'

const HomeBots = () => {
  const {aiBots} = UseAi();
  return (
    <div className='border p-6 rounded-md min-h-72 relative'>

    <div className="flex  items-center gap-2 border-b pb-4" id="top">
    
    <h1 className="text-2xl font-semibold">Bots</h1>
    <ToolTip>Number of bots active in your account.</ToolTip>
    
    </div>
    
    <div className="" id="content">
    <div className="mt-4" id='Bots'>
        <h2 className='text-6xl text-bold'>{aiBots.length}</h2>
        <h3 className='mt-1 dark:text-gray-300  text-lg'>Prebuilt Bots Active</h3>
        </div>
    
    
    </div>
          
        </div>
  )
}

export default HomeBots
