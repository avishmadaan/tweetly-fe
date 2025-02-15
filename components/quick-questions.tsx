import React from 'react'

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

        <p className="text-center text-md">
            This is a ultimate place where you can ask any question about the bots or give them any thing to write upon.
        </p>
        {questions.map((ques, index) => (

            <div 
            className="p-2 bg-gray-100 dark:bg-white dark:text-black  rounded-md text-sm cursor-pointer" 
            key={index}
            onClick={() => getQuickQuestionReply(ques)}

            >
                {ques}
            </div>
        ))}
      
    </div>
  )
}

export default QuickQuestions
