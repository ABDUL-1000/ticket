"use client"

import { useScrollAnimation } from "@/lib/use-scrol-animation"
import { CheckCircle, Award, Palette, Mic, Heart } from "lucide-react"


export default function EventDetails() {
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation(0.1)
  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation(0.2)
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation(0.2)
  const { ref: speakersRef, isVisible: speakersVisible } = useScrollAnimation(0.2)

  const highlights = [
    "Poetry and spoken word performances",
    "Panel discussions on art as social change",
    "Youth advocacy and empowerment talks",
    "Networking with artists and changemakers",
    "Visual art exhibitions and displays",
    "Storytelling and narrative sessions",
    "Community dialogue and reflection spaces",
  ]

  const agenda = [
    {
      time: "10:00 AM",
      title: "Games",
      description: "Check-in, networking, and opening remarks",
    },
    {
      time: "11:30 AM",
      title: "Exibition/Games and Tea",
      description: "The power of creative expression in social change",
    },
    {
      time: "12:30 PM",
      title: "Storytelling and Prayer",
      description: "Young voices sharing their stories through poetry",
    },
    {
      time: "1:30 PM",
      title: "Welcome, Opening Remark and Speech",
      description: "Hands-on creative workshop for participants",
    },
    {
      time: "2:30 PM",
      title: "Lunch and Panel",
      description: "Community meal and informal discussions",
    },
    {
      time: "4:30 PM",
      title: "Speakers/Performance ",
      description: "Discussion on using art for social advocacy",
    },

  ]

  const speakers = [
    {
      name: "Aisha Indabawa",
      title: "Poet & SDG Advocate",
      description: "The founder of shining voice global link ",
    },
    {
      name: "Shining voice team",
      title: "Creatives",
      description: "Poets focusing on social issues",
    },
    {
      name: "Artist and educators",
      title: "Exhibitors/ speakers ",
      description: "Like minds from different creative sectors.",
    },
  ]

  return (
    <section id="event-details" className="py-12 sm:py-16 bg-gradient-to-b from-orange-50 to-white scroll-smooth">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            ref={detailsRef}
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
              detailsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
              About Art Speaks Here
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Shining Voice Global Link, known for harnessing the power of storytelling, poetry, visual art, and
              advocacy, is organizing a one-day creative event that brings together artists, thinkers, and
              change-makers.
            </p>
          </div>

          <div ref={highlightsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Event Highlights */}
            <div
              className={`transition-all duration-1000 ${
                highlightsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2 animate-pulse" />
                What to Expect
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 transform hover:translate-x-2 transition-all duration-300 ${
                      highlightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-1 flex-shrink-0 animate-pulse" />
                    <p className="text-sm sm:text-base text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Agenda */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                highlightsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2 animate-pulse" />
                Event Schedule
              </h3>
              <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-2">
                {agenda.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-orange-100 transform hover:scale-105 hover:shadow-md transition-all duration-300 ${
                      highlightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <span className="bg-orange-100 text-orange-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full flex-shrink-0 animate-pulse">
                        {item.time}
                      </span>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900">{item.title}</h4>
                    </div>
                    {/* <p className="text-gray-600 text-xs sm:text-sm ml-0 sm:ml-2">{item.description}</p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div
            ref={missionRef}
            className={`bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 transform hover:scale-105 transition-all duration-500 ${
              missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center">
              <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-orange-200 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base md:text-lg text-orange-100 max-w-4xl mx-auto leading-relaxed">
                This event seeks to create a safe and inspiring space where expression fuels impact. We believe that
                when artists, advocates, and thinkers come together, they can spark meaningful conversations and drive
                positive change in our communities.
              </p>
            </div>
          </div>

          {/* Featured Voices */}
          <div ref={speakersRef}>
            <h3
              className={`text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center flex items-center justify-center transition-all duration-1000 ${
                speakersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2 animate-pulse" />
              Featured Voices
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-orange-100 text-center hover:shadow-lg transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ${
                    speakersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                    <span className="text-lg sm:text-2xl font-bold text-orange-600">{speaker.name.charAt(0)}</span>
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">{speaker.name}</h4>
                  <p className="text-orange-600 text-xs sm:text-sm font-medium mb-2">{speaker.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{speaker.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
