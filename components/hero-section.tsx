"use client"

import { Calendar, MapPin, Clock, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/lib/use-scrol-animation"
import Image from "next/image"


interface HeroSectionProps {
  onBookNow: () => void
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)

  const scrollToDetails = () => {
    document.getElementById("event-details")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 animate-pulse"></div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-1000 hidden md:block"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-orange-300/30 rounded-full animate-bounce delay-2000 hidden md:block"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-3000 hidden md:block"></div>

      <div ref={heroRef} className="relative container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Shining Voice Global Link Branding */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 transform hover:scale-105 transition-transform duration-300 font-serif">
            <span className="text-orange-200 drop-shadow-lg">Shining Voice</span>
          </h1>
          <p className="text-orange-200 text-xs sm:text-sm tracking-wider animate-pulse">GLOBAL LINK</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div
            className={`space-y-4 sm:space-y-6 order-2 lg:order-1 transition-all duration-1000 delay-300 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight transform hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                  Art Speaks Here: A Day of Art and Dialogue
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-orange-100 leading-relaxed">
                In today's world, creative expression remains one of the most powerful tools for social change,
                reflection, and unity. Young voices, artists, and advocates often seek platforms to not only showcase
                their talent but to also address pressing societal issues in innovative ways.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4 transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-200 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Saturday, 23rd August 2025</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-200 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">E-Health Africa, 4-6 Independence Road, Kano</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-200 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">10:00 AM – 6:00 PM</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-200 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Fee: ₦5,000</span>
              </div>
            </div>

            <Button
              onClick={onBookNow}
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transform hover:scale-110 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <span className="animate-pulse">Buy Ticket</span>
            </Button>
          </div>

          {/* Right Content - Artist Image */}
          <div
            className={`flex justify-center lg:justify-end order-1 lg:order-2 transition-all duration-1000 delay-500 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <Image
                  src="/za.jpg"
                  width={500}
                  height={500}
                  alt="Artist speaking at Shining Voice Global Link event"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Animated Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 sm:w-16 h-12 sm:h-16 bg-orange-300/30 rounded-full blur-lg animate-bounce delay-1000"></div>
              <div className="absolute top-1/2 -left-8 w-8 h-8 bg-white/10 rounded-full animate-ping delay-2000"></div>
            </div>
          </div>
        </div>

        {/* Organized by section */}
        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-1000 delay-700 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transform hover:scale-105 transition-transform duration-300">
            Organized by Shining Voice Global Link!
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed px-4">
            Step into a world where creativity meets conversation, and expression sparks transformation. Join us for Art
            Speaks Here: A Day of Art & Dialogue — a powerful one-day event that brings together artists, poets, youth
            advocates, and changemakers in Kano!
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToDetails}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/70 hover:text-white transition-colors duration-300" />
        </div>
      </div>
    </section>
  )
}
