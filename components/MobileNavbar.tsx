"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Button } from "./ui/button";

import Link from "next/link";



function MobileNavbar() {

  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div className="md:hidden space-x-2">
    
    

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger>
          <Button variant="ghost" size="icon">
           <img src="/Frame 30.png" alt="menuIcon" className="w-6 h-6"/>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[90%]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-2 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
               
                The story
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
               
                Projects
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
               
                Resume
              </Link>
            </Button>
            <Button  className="flex items-center gap-2 px-6 bg-[#0072FF] rounded-lg " asChild>
            <Link href="/Notifications">
            
              <span className="  text-white font-[Work_Sans] text-[18px] not-italic font-medium leading-[24px] ">Let’s build</span>
            </Link>
          </Button>
         
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
