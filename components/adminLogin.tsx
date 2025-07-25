"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, Lock, Mail, Shield } from "lucide-react"
import { useAdminAuth } from "@/lib/use-admin-auth"


export default function AdminLogin() {
  const router = useRouter()
  const { login, isLoading, error, clearError } = useAdminAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [formErrors, setFormErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {}

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required"
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await login(formData)
      router.push("/aisha/dashboard")
    } catch (error) {
      // Error is handled by the hook
      console.error("Login failed:", error)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    // Clear API error when user starts typing
    if (error) {
      clearError()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="flex items-center text-orange-700">
              <Lock className="w-5 h-5 mr-2" />
              Secure Access
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* API Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="admin@shiningvoice.com"
                    className={`pl-10 ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    } focus:border-orange-400 focus:ring-orange-400 transition-all duration-300`}
                  />
                </div>
                {formErrors.email && <p className="text-red-500 text-sm mt-1 animate-bounce">{formErrors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className={`pl-10 ${
                      formErrors.password ? "border-red-500" : "border-gray-300"
                    } focus:border-orange-400 focus:ring-orange-400 transition-all duration-300`}
                  />
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1 animate-bounce">{formErrors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-medium text-lg transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

         
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">© 2025 Shining Voice Global Link. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
