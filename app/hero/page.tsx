import HeroSection from '@/components/hero-section'
import React from 'react'

const page = ({onBookNow}: {onBookNow: () => void}) => {
  return (
    <div>
      <HeroSection onBookNow={onBookNow}/>
    </div>
  )
}

export default page
