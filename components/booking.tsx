"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CldUploadButton } from "next-cloudinary"
import type { CloudinaryUploadWidgetResults, CloudinaryUploadWidgetError } from "next-cloudinary"
import {
  Ticket,
  Instagram,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  User,
  Upload,
  ImageIcon,
} from "lucide-react"
import { useScrollAnimation } from "@/lib/use-scrol-animation"

import Image from "next/image"
import { useTicketPurchase } from "@/lib/use-ticket-api"

interface BookingFormData {
  name: string
  email: string
  phone: string
  accountToPay: string
}

type Step = 1 | 2 | 3

export default function BookingFormMultiStepWithAPI() {
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1)
  const { purchaseTicketMutation, isLoading: apiLoading, error: apiError } = useTicketPurchase()

  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    accountToPay: "",
  })

  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("")
  const [uploadedImageId, setUploadedImageId] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Payment Proof", icon: Upload },
    { number: 3, title: "Complete", icon: CheckCircle },
  ]

  const validateStep1 = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.accountToPay.trim()) {
      newErrors.accountToPay = "Account number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    if (!uploadedImageUrl) {
      setUploadError("Please upload your payment receipt first")
      return false
    }
    return true
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step)
  }

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFinalSubmit = async () => {
    if (!uploadedImageUrl) {
      setUploadError("Please upload payment proof first")
      return
    }

    try {
      const ticketData = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        accountToPay: formData.accountToPay,
        imageUrl: uploadedImageUrl,
      }

      console.log("📤 Sending ticket purchase data:", ticketData)

      const response = await purchaseTicketMutation(ticketData)
      console.log("✅ Ticket purchase successful:", response)

      setIsComplete(true)
    } catch (error) {
      console.error("❌ Ticket purchase failed:", error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 mx-auto text-orange-500 mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              <p className="text-gray-600">Please fill in your details</p>
            </div>

            <div className="space-y-4">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={`${errors.name ? "border-red-500" : "border-gray-300"} focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 w-full`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.name}</p>}
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@gmail.com"
                  className={`${errors.email ? "border-red-500" : "border-gray-300"} focus:border-orange-400 focus:ring-orange-400 transition-all duration-300`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.email}</p>}
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234 809 342 3456"
                  className={`${errors.phone ? "border-red-500" : "border-gray-300"} focus:border-orange-400 focus:ring-orange-400 transition-all duration-300`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.phone}</p>}
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number Used for Payment</label>
                <Input
                  type="tel"
                  value={formData.accountToPay}
                  onChange={(e) => handleInputChange("accountToPay", e.target.value)}
                  placeholder="e.g 0000000000"
                  className={`${errors.accountToPay ? "border-red-500" : "border-gray-300"} focus:border-orange-400 focus:ring-orange-400 transition-all duration-300`}
                />
                {errors.accountToPay && (
                  <p className="text-red-500 text-sm mt-1 animate-bounce">{errors.accountToPay}</p>
                )}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Registration Fee</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Art Speaks Here Ticket</span>
                  <span className="font-bold text-2xl text-orange-600 animate-pulse">₦5,000</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Upload className="w-12 h-12 mx-auto text-orange-500 mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">Upload Payment Proof</h3>
              <p className="text-gray-600">Please upload your payment receipt</p>
            </div>

            {/* Upload Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Upload Guidelines:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Upload a clear image of your payment receipt</li>
                <li>• Ensure all transaction details are visible</li>
                <li>• Supported formats: JPG, PNG, GIF</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>

            {/* Error Display */}
            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{uploadError}</p>
              </div>
            )}

            {/* Upload Area */}
            {!uploadedImageUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
                <p className="text-gray-600 mb-4">
                  {isUploading ? "Uploading your payment receipt..." : "Click below to upload your payment receipt"}
                </p>

                <CldUploadButton
                  uploadPreset="payment-upload"
                  options={{
                    maxFiles: 1,
                    folder: "payment-receipts",
                    resourceType: "image",
                    maxFileSize: 10000000,
                    sources: ["local", "camera"],
                    multiple: false,
                    clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
                  }}
                  onSuccess={(results: CloudinaryUploadWidgetResults) => {
                    console.log("✅ Upload successful:", results)

                    if (results.info && typeof results.info === "object" && "secure_url" in results.info) {
                      const info = results.info
                      setUploadedImageUrl(info.secure_url)
                      setUploadedImageId(info.public_id)
                      setUploadError(null)
                      console.log("📸 Image URL set:", info.secure_url)
                    }
                    setIsUploading(false)
                  }}
                  onError={(error: CloudinaryUploadWidgetError) => {
                    console.error("❌ Upload failed:", error)
                    setUploadError("Upload failed. Please check your file and try again.")
                    setIsUploading(false)
                  }}
                  onUpload={() => {
                    setIsUploading(true)
                    setUploadError(null)
                  }}
                  className="w-full"
                >
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-lg font-medium transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Upload className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Payment Receipt
                      </>
                    )}
                  </Button>
                </CldUploadButton>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Upload Success */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="text-green-800 font-medium">Payment receipt uploaded successfully!</p>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="border rounded-lg p-4 bg-white">
                  <Image
                    src={uploadedImageUrl || "/placeholder.svg"}
                    alt="Payment receipt"
                    width={400}
                    height={300}
                    className="max-w-full h-auto max-h-64 mx-auto rounded border"
                  />
                </div>

                {/* Re-upload option */}
                <div className="text-center">
                  <Button
                    onClick={() => {
                      setUploadedImageUrl("")
                      setUploadedImageId("")
                      setUploadError(null)
                    }}
                    variant="outline"
                    className="bg-transparent"
                  >
                    Upload Different Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-12 h-12 mx-auto text-orange-500 mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">Review & Complete</h3>
              <p className="text-gray-600">Please review your information before submitting</p>
            </div>

            {/* Review Information */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900">Your Information:</h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Account Number:</strong> {formData.accountToPay}
                </p>
              </div>
            </div>

            {/* Payment Receipt Preview */}
            {uploadedImageUrl && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Payment Receipt:</h4>
                <Image
                  src={uploadedImageUrl || "/placeholder.svg"}
                  alt="Payment receipt"
                  width={200}
                  height={150}
                  className="rounded border"
                />
              </div>
            )}

            {/* API Error Display */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{apiError}</p>
              </div>
            )}
          </div>
        )
    }
  }

  // Success screen
  if (isComplete) {
    return (
      <section className="py-12 sm:py-16 bg-gray-100 min-h-screen scroll-smooth">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Ticket Purchase Successful! 🎉</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Your ticket has been successfully purchased and payment proof uploaded. You'll receive a confirmation
                email shortly.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Next Steps:</strong>
                  <br />• Check your email for ticket confirmation
                  <br />• Save your ticket for event entry
                  <br />• Arrive at the venue on time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-12 sm:py-16 bg-gray-100 min-h-screen scroll-smooth">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Shining Voice Branding */}
          <div
            className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${
              formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-orange-600 transform hover:scale-105 transition-transform duration-300 font-serif">
              <span>Shining Voice</span>
            </h1>
            <p className="text-orange-500 text-xs sm:text-sm tracking-wider animate-pulse">GLOBAL LINK</p>
          </div>

          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 delay-200 ${
              formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
              Get Your Ticket Here
            </h2>
          </div>

          <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left Side - Event Info */}
            <div
              className={`space-y-4 sm:space-y-6 order-2 lg:order-1 transition-all duration-1000 delay-400 ${
                formVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Social Media</h3>
                <div className="flex items-center space-x-4 mb-4 sm:mb-6 group cursor-pointer transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium group-hover:text-orange-600 transition-colors duration-300">
                    @shiningvoicegloballink
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm transform hover:scale-105 hover:shadow-lg transition-all duration-500">
                <Image
                  width={400}
                  height={400}
                  src="zd.jpg"
                  alt="Art Speaks Here Event"
                  className=" rounded-lg"
                />
              </div>

              {/* Event Info Card */}
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                    <Ticket className="w-5 h-5 mr-2 animate-pulse" />
                    Event Information
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base text-orange-100">
                    <p className="transform hover:translate-x-2 transition-transform duration-300">
                      <strong>Date:</strong> Saturday, 23rd August 2025
                    </p>
                    <p className="transform hover:translate-x-2 transition-transform duration-300">
                      <strong>Time:</strong> 10:00 AM – 6:00 PM
                    </p>
                    <p className="transform hover:translate-x-2 transition-transform duration-300">
                      <strong>Venue:</strong> E-Health Africa, 4-6 Independence Road, Kano
                    </p>
                    <p className="transform hover:translate-x-2 transition-transform duration-300">
                      <strong>Fee:</strong> ₦5,000
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Multi-Step Form */}
            <div
              className={`order-1 lg:order-2 transition-all duration-1000 delay-600 ${
                formVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-500">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="flex items-center justify-between text-orange-700 text-lg sm:text-xl">
                    <div className="flex items-center">
                      <Ticket className="w-5 h-5 mr-2 animate-pulse" />
                      Register for Art Speaks Here
                    </div>
                    <span className="text-sm font-normal">Step {currentStep} of 3</span>
                  </CardTitle>

                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mt-4">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            currentStep >= step.number ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {currentStep > step.number ? "✓" : step.number}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-12 h-1 mx-2 transition-all duration-300 ${
                              currentStep > step.number ? "bg-orange-500" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6">
                  {renderStepContent()}

                  <div className="flex space-x-4 mt-8">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 py-3 rounded-lg font-medium text-base sm:text-lg transform hover:scale-105 transition-all duration-300 bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    )}

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-medium text-base sm:text-lg transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-medium text-base sm:text-lg transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                        disabled={apiLoading}
                      >
                        {apiLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete Purchase
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
