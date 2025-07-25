"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CreditCard, Building, Hash, DollarSign, CheckCircle } from "lucide-react"

import { useState } from "react"
import { PaymentDetails } from "@/lib/type"
import { useScrollAnimation } from "@/lib/use-scrol-animation"

interface PaymentDetailsProps {
  paymentDetails: PaymentDetails
  bookingData: {
    name: string
    ticketType: string
    amount: number
  }
  onContinue: () => void
}

export default function PaymentDetailsComponent({ paymentDetails, bookingData, onContinue }: PaymentDetailsProps) {
  const { ref: paymentRef, isVisible: paymentVisible } = useScrollAnimation(0.1)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white min-h-screen scroll-smooth">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div
            className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${
              paymentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
              Complete Your Payment
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Transfer the exact amount to the account below and upload your payment proof
            </p>
          </div>

          <div ref={paymentRef} className="space-y-4 sm:space-y-6">
            {/* Booking Summary */}
            <Card
              className={`shadow-lg hover:shadow-xl transition-all duration-500 ${
                paymentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <CreditCard className="w-5 h-5 mr-2 animate-pulse" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="text-gray-600 text-sm sm:text-base">Name:</span>
                    <span className="font-medium text-sm sm:text-base">{bookingData.name}</span>
                  </div>
                  <div className="flex justify-between items-center transform hover:translate-x-2 transition-transform duration-300">
                    <span className="text-gray-600 text-sm sm:text-base">Ticket Type:</span>
                    <span className="font-medium text-sm sm:text-base">{bookingData.ticketType}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-semibold">Total Amount:</span>
                      <span className="text-xl sm:text-2xl font-bold text-blue-600 animate-pulse">
                        ₦{bookingData.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card
              className={`shadow-lg hover:shadow-xl transition-all duration-500 delay-200 ${
                paymentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Building className="w-5 h-5 mr-2 animate-pulse" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 animate-pulse">
                    <p className="text-yellow-800 text-sm font-medium">
                      ⚠️ Please transfer the EXACT amount shown above
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <Building className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">Bank Name</p>
                          <p className="font-semibold text-sm sm:text-base">{paymentDetails.bankName}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(paymentDetails.bankName, "bank")}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        {copiedField === "bank" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">Account Number</p>
                          <p className="font-semibold text-base sm:text-lg">{paymentDetails.accountNumber}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(paymentDetails.accountNumber, "account")}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        {copiedField === "account" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">Account Name</p>
                          <p className="font-semibold text-sm sm:text-base">{paymentDetails.accountName}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(paymentDetails.accountName, "name")}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        {copiedField === "name" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <div>
                          <p className="text-xs sm:text-sm text-blue-600">Amount to Transfer</p>
                          <p className="font-bold text-lg sm:text-xl text-blue-600 animate-pulse">
                            ₦{paymentDetails.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(paymentDetails.amount.toString(), "amount")}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        {copiedField === "amount" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div
              className={`text-center transition-all duration-1000 delay-400 ${
                paymentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Button
                onClick={onContinue}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 sm:px-8 py-3 text-base sm:text-lg transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                size="lg"
              >
                I've Made the Payment - Upload Proof
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
