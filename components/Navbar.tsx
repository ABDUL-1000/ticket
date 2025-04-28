import Link from 'next/link'
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

const Navbar = () => {
  return (
    <nav className='sticky  top-0   w-full h-16 z-50 backdrop-blur supports-[backdrop-filter]:bg/96'>
      <div className='max-w-7xl lg:mx-[140px] px-4 '>
        <div className='flex justify-between items-center h-16' >
            <div className='flex items-center'>

            <Link href='/' className='text-white font-[Work_Sans] mr-4 lg:mr-0 lg:text-[24px] italic font-normal leading-[24px]'> Yusuf.Unfiltered</Link>
            </div>
            <DesktopNavbar/>
            <MobileNavbar/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
