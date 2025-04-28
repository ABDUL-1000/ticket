import { voices } from '@/data'
import React from 'react'
import { motion } from 'framer-motion' // Import framer-motion

const Voice = () => {
  return (
    <div>
      <div className="py-5">
        <motion.h1
          className="text-[#535353] text-[44px] lg:text-start text-center font-[Work_Sans] lg:text-[44px] not-italic font-medium leading-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className='lg:hidden md:hidden'> The </span>Voices <span className="hidden lg:inline md:inline">Behind the Work</span>
        </motion.h1>
        <div className="">
          <div className="grid md:grid-cols-3 gap-2 mt-10">
            {voices.map((item, index) => (
              <motion.div
                key={index}
                className="border border-[#535353] rounded-lg lg:p-6 p-2 flex flex-col my-auto justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }} // Delay each card's animation
              >
                <p className="text-white font-[Manrope] text-[14px] font-normal">
                  {item.desc}
                </p>
                <h2 className="text-[#757575] font-[Manrope] text-[15px] font-medium">
                  {item.title}
                </h2>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Voice
