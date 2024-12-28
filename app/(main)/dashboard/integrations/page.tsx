import OpenAiIntegration from '@/components/open-ai'
import TwitterIntegration from '@/components/twitter-integration'
import React from 'react'

const Integrations = () => {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 h-fit' >
        <TwitterIntegration />
        <OpenAiIntegration />
      
    </div>
  )
}

export default Integrations
