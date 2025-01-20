import React from 'react'
import ToolTip from './ui/tooltip'

const OnboardChecklist = () => {
  return (
    <div className='border p-6 rounded-md min-h-72 flex-wrap'>
 <div className="flex items-center gap-2" id="top">

<h1 className="text-2xl font-semibold">Onboarding Checklist</h1>
<ToolTip>This section will numbers you need for the review of your social media management.</ToolTip>

</div>

<div className="flex flex-wrap mt-4 text-lg" id="content">

    <input title='checklist' type="checkbox" name="" id="" className='mr-4'/>
    Step 1: Go To Integration Tab, Integrate Your X profile and Enter OpenAi API Key.
</div>

      
    </div>
  )
}

export default OnboardChecklist
