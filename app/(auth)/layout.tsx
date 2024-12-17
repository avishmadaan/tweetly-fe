import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import Link from 'next/link'

import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        <ThemeSwitcher className='absolute right-5 top-5' />
        {children}
        <div className="md:w-[30%] min-w-[350px] text-center mt-5 text-xs leading-relaxed ">By clicking continue, you agree to our <br></br> 
      <Link href={"/legal"}> 
      <span className='underline'>Terms of Service | Privacy Policy  </span>
      </Link> 
      </div>
      
    </div>
  )
}

export default Layout
