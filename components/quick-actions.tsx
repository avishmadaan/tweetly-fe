import React from 'react'

const questions = [
  "Can you craft a witty tweet about coding?",
  "Write a tweet on AI and its future impact.",
  "Can you create a tweet celebrating open-source?",
  "Can you make a funny tweet about developer life?"
];
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
