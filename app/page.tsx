"use client"

import BookingForm from "@/components/booking"
import EventDetails from "@/components/event-details"
import HeroSection from "@/components/hero-section"
import PaymentDetailsComponent from "@/components/payment-detail"
import PaymentUpload from "@/components/payment-upload"
import { BookingFormData, PaymentDetails } from "@/lib/type"
import { useState } from "react"


export default function ArtSpeaksEventPage() {
  const [currentStep, setCurrentStep] = useState<"hero" | "booking" | "payment" | "upload">("hero")
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null)

  const paymentDetails: PaymentDetails = {
    accountName: "Shining Voice Global Link",
    accountNumber: "1234567890",
    bankName: "First Bank Nigeria",
    amount: 5000,
  }

  const handleBookNow = () => {
    setCurrentStep("booking")
  }

  const handleBookingSubmit = (data: BookingFormData) => {
    setBookingData(data)
    setCurrentStep("payment")
  }

  const handlePaymentContinue = () => {
    setCurrentStep("upload")
  }

  const handleFileUpload = async (file: File) => {
    // Simulate file upload
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("File uploaded:", file.name)
        resolve(true)
      }, 2000)
    })
  }

  const handleUploadSuccess = () => {
    // Handle successful upload
    console.log("Upload completed successfully")
    // Could redirect to success page or reset form
  }

  const getBookingInfo = () => {
    if (!bookingData) return null
    return {
      name: bookingData.name,
      ticketType: "Art Speaks Here Ticket",
      amount: 5000,
    }
  }

  return (
    <div className="min-h-screen">
      {currentStep === "hero" && (
        <>
          <HeroSection onBookNow={handleBookNow} />
          <EventDetails />
        </>
      )}

      {currentStep === "booking" && <BookingForm onSubmit={handleBookingSubmit} />}

      {currentStep === "payment" && bookingData && (
        <PaymentDetailsComponent
          paymentDetails={paymentDetails}
          bookingData={getBookingInfo()!}
          onContinue={handlePaymentContinue}
        />
      )}

      {currentStep === "upload" && <PaymentUpload onUpload={handleFileUpload} onSuccess={handleUploadSuccess} />}
    </div>
  )
}
