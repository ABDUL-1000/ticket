
import React from 'react'
import { CiMail } from "react-icons/ci";
import { motion } from 'framer-motion'; // Import framer-motion
import Link from 'next/link';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <div>
       <div className="py-10 flex flex-col items-center">
      <motion.h1
        className="text-[#ECECEC] lg:text-center font-[Work_Sans] text-[44px] lg:text-[77px] font-medium"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Ready to Create Together? 
      </motion.h1>
      <motion.p
        className='text-[#CACACA] font-[Work_Sans] text-[14px] lg:text-[18px] font-medium'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        If you’ve got a project, idea, or just wanna vibe about Tech/design, I’m always down to chat. Let’s make it real together.
      </motion.p>
      <Button className="flex items-center w-[99%] lg:w-1/3 lg:px-2 bg-[#0072FF] rounded-lg mt-5">
       <span><CiMail className='w-2 h-2 lg:w-4 lg:h-4 text-white'/></span> <span className='text-white text-[10px]'>yusufababah50@gmail.com</span>
      </Button>
      
      <motion.div
        className='flex mt-4 gap-1 lg:hidden md:hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img src="/Frame 30 (5).png" alt="twitter" className='w-6 h-6'/>
        <img src="/Frame 50.png" alt="linkedin" className='w-6 h-6' />
        <img src="/Frame 49.png" alt="Gituhub" className='w-6 h-6'/>
      </motion.div>
      </div>
      <div className='flex justify-between items-center'>
      <div>
        <p className='text-[9px] lg:text-[12px]'>© Yusuf 2025</p>
      </div>
      <motion.div
        className='lg:flex gap-2 hidden md:inline'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <img src="/Frame 30 (5).png" alt="twitter" className='w-6 h-6'/>
        <img src="/Frame 50.png" alt="linkedin" className='w-6 h-6' />
        <img src="/Frame 49.png" alt="Gituhub" className='w-6 h-6'/>
      </motion.div>
      <div>
      
        <p className='text-[6px] lg:text-[12px]'>Built by Yusuf &  <a href="https://abdullateeftsx.vercel.app/" target='_blank'> <span className='hover:cursor-pointer hover:text-[#0072FF]'> Abdullatif Abdulkarim. </span> </a> </p>
      
      </div>
      </div>
    </div>
  )
}

export default Footer;
