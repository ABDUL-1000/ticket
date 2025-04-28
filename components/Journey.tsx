import { Journeyy } from "@/data";
import React from "react";
import { motion } from "framer-motion"; // Import framer-motion

const Journey = () => {
  return (
    <div className="py-5">
      <motion.h1
        className="text-[#535353] text-[44px] text-center font-[Work_Sans] lg:text-[44px] not-italic font-medium leading-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        The Journey <span className="hidden lg:inline md:inline">So Far</span> 
      </motion.h1>
      
      <div className="py-8">
        <div className="space-y-2">
          {Journeyy.map((item, index) => (
            <motion.div
              key={index}
              className="border-[#D5D7DA] border-b p-2 flex flex-col space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 * index }} // Stagger the animation delay
            >
              {/* Main Content */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.img}
                  alt="Icon"
                  className="lg:w-10 lg:h-10 w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="lg:flex justify-between gap-x-80 items-center">
                    <p className="text-white font-[Work_Sans] text-[9px] not-italic font-medium lg:text-[24px] line-clamp-1">
                      {item.quote}
                    </p>
                    <p className="text-white font-[Work_Sans] text-[9px] not-italic font-normal">
                      {item.duration}
                    </p>
                  </div>

                  <p className="text-[#757575] hidden lg:block md:block font-[Manrope] text-[16px] not-italic font-medium">
                    {item.time}
                  </p>
                </div>
              </div>

              {/* Story Section */}
              <div className="text-[#CACACA] font-[Work_Sans] text-[10px] not-italic font-normal">
                {item.story}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journey;
