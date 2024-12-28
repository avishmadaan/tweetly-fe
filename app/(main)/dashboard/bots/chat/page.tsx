import ChatWithBot from '@/components/chat-with-bot'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/ui/tooltip'
import { ChevronDown } from 'lucide-react'
import React from 'react'

const Chat = () => {
  return (
    <div className=''>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-2xl flex items-center gap-2">Test Your Bot

          <ToolTip>You can test this bot here, how they will write the post here and respond to comment.</ToolTip>
        </h2>

        <Button
          className='text-sm'
          endIcon={<ChevronDown size={16} />}
          variant='primary'
          >
          Select Your Bot
          </Button>
          </div>

          <div className="" id="chatbox">
            <ChatWithBot />

          </div>

    </div>
  )
}

export default Chat
