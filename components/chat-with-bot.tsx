import React from 'react'
import { Button } from './ui/button'
import Input from './ui/input'
import { SendHorizonal } from 'lucide-react'

const ChatWithBot = () => {
  return (
    <div className='border min-h-[300px] flex-grow rounded-md flex flex-col justify-between shadow-md w-full'>
        <div className="" id="chats"></div>

        <div className="border-t min-h-[80px] p-4 relative w-full" id="input">

            <div className="flex items-center gap-2 w-full" id="inputCompo">

            <Input type="text"
            placeholder='Send a message'
            className=' h-[110%] my-0'
            />

            <Button
                variant='primary'
                className='  '
                endIcon={<SendHorizonal size={16} />}
                >Send</Button>
                </div>
                

        </div>
    
    </div>
  )
}

export default ChatWithBot
