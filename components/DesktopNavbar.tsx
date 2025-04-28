
import React from "react";

import { Button } from "./ui/button";

import Link from "next/link";


 function DesktopNavbar() {

  return (
    <div className="hidden md:flex space-x-4">
    
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
       
          <span className="hidden lg:inline text-[#CACACA] font-[Work_Sans] text-[18px] not-italic font-medium leading-[24px]">The strory</span>
        </Link>
      </Button>
 
  
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/Notifications">
            
              <span className="hidden lg:inline text-[#CACACA] font-[Work_Sans] text-[18px] not-italic font-medium leading-[24px]">Projects</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <a href="https://drive.google.com/file/d/1Q73-NYX79qFhRdmvtgwPXKwZAL8DJRhd/view?usp=drive_link"
            target="_blank">
            
              <span className="hidden lg:inline text-[#CACACA] font-[Work_Sans] text-[18px] not-italic font-medium leading-[24px]">Resume</span>
            </a>
          </Button>
          <Button  className="flex items-center gap-2 px-6 bg-[#0072FF] hover:bg-blue-500 rounded-lg " asChild>
            <a href="https://drive.google.com/file/d/1Q73-NYX79qFhRdmvtgwPXKwZAL8DJRhd/view?usp=drive_link"
            target="_blank">
            
              <span className="hidden lg:inline text-white font-[Work_Sans] text-[18px] not-italic font-medium leading-[24px] ">Let’s build</span>
            </a>
          </Button>

        
        
    
     
    </div>
  );
}

export default DesktopNavbar;
