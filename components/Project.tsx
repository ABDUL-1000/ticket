'use client'
import { projects } from '@/data'
import React, { useState } from 'react'
import { motion } from 'framer-motion' // Import framer-motion

const Project = () => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }
  
  const itemLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }
  
  const itemRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }
  
  const [showAll, setShowAll] = useState(false)

  // Determine which projects to show
  const visibleProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <div className='py-10'>
      <motion.h1
        className='text-[#535353] text-center lg:text-start font-[Work_Sans] text-[44px] not-italic font-medium leading-none'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Projects
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {visibleProjects.map((project, i) => (
          <motion.div
            key={project.id}
            className="bg-[#0C0C0C] rounded-2xl overflow-hidden shadow-lg flex flex-col"
            initial={{ opacity: 0, y: 20 }}
              variants={i % 2 === 0 ? itemLeft : itemRight}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-[240px] object-cover"
            />

            <div className="flex justify-between lg:justify-between flex-1 p-2 lg:p-2">
              <div>
                <h2 className="text-[#D5D7DA] font-[Manrope] text-[12px] not-italic font-semibold leading-none">
                  {project.title}
                </h2>
                <p className='text-[#757575] font-[Manrope] mt-1 text-[9px] not-italic font-medium leading-none'>
                  {project.des}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0072FF] font-[Manrope] text-[10px] lg:text-[16px] not-italic font-medium leading-none underline decoration-solid decoration-auto decoration-ink-auto decoration-thickness-auto underline-offset-auto underline-from-font"
                >
                  View Project
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show button only if not showing all */}
      {!showAll && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={() => setShowAll(true)}
            className="text-[#0072FF] font-[Manrope] text-[16px] not-italic font-medium underline underline-offset-auto decoration-solid decoration-[#0072FF]"
          >
            View More Projects
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default Project
