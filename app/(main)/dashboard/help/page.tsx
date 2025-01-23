import OnboardChecklist from '@/components/onboarding-checklist'
import ToolTip from '@/components/ui/tooltip'
import React from 'react'

const Help = () => {
  return (
    <div className="w-full">
    <div className="flex justify-between items-center mb-8 w-full ">
     <h2 className="font-semibold text-2xl flex items-center gap-2">Help Center

       <ToolTip>You will get help here regarding how to use this tool.</ToolTip>
     </h2>

</div>
<div className="flex  gap-4" id="content">


    <OnboardChecklist />

    
    </div>
    </div>
  )
}

export default Help
