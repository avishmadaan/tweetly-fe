// import DevTwitter from '@/components/dev-twitter'
import OpenAiIntegration from '@/components/open-ai'
import TwitterIntegration from '@/components/twitter-integration'
import React from 'react'

const Integrations = () => {
  return (
    <div className='grid gap-6 lg:grid-cols-3 md:grid-cols-2 h-fit' >
        {/* <DevTwitter /> */}
        <TwitterIntegration />
        <OpenAiIntegration />
        
      
    </div>
  )
}

export default Integrations
