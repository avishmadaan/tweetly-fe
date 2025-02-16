import { Bot } from 'lucide-react'
import React from 'react'
import QuickActions from './quick-actions'

const questions = [

    "Can you write a viral tweet for me?",
    "Can you write a tweet on AI?",
    "Write tweet on machine learning?"
]

const QuickQuestions = ({getQuickQuestionReply}:{
    getQuickQuestionReply:(text:string) => void
}) => {
  return (
    <div className='flex flex-wrap gap-3 w-[70%] justify-center mx-auto'>
       
            
        <Bot className='' size={64} />
        <p className="text-center text-md">
            This is a ultimate place where you can ask any question about the bots or give them any thing to write upon.
        </p>

        <QuickActions getQuickQuestionReply={getQuickQuestionReply}/>
      
      
    </div>
  )
}

export default QuickQuestions
