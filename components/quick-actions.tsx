import React from 'react'

const questions = [

    "Can you write a viral tweet for me?",
    "Can you write a tweet on AI?",
    "Write tweet on machine learning?"
]
const QuickActions =  ({getQuickQuestionReply, className}:{
    getQuickQuestionReply:(text:string) => void,
    textPart?:boolean
    className?:string
}) => {
  return (
    <>
    {questions.map((ques, index) => (

<div 
className={`p-2 bg-gray-100 dark:bg-white dark:text-black  rounded-md text-sm cursor-pointer  ${ className}`}
key={index}
onClick={() => getQuickQuestionReply(ques)}

>
    {ques}
</div>
))}
</>
  )
}

export default QuickActions
