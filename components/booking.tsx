"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CldUploadButton } from "next-cloudinary";
import type {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetError,
} from "next-cloudinary";
import {
  Ticket,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  User,
  Upload,
  ImageIcon,
} from "lucide-react";

import Image from "next/image";
import { useTicketPurchase } from "@/lib/use-ticket-api";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  accountToPay: string;
}

type Step = 1 | 2 | 3;

export default function BookingFormMultiStepWithAPI() {
  const {
    purchaseTicketMutation,
    isLoading: apiLoading,
    error: apiError,
  } = useTicketPurchase();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    accountToPay: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadedImageId, setUploadedImageId] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isCloudinaryOpening, setIsCloudinaryOpening] = useState(false);

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Payment Proof", icon: Upload },
    { number: 3, title: "Complete", icon: CheckCircle },
  ];

  const validateStep1 = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.accountToPay.trim()) {
      newErrors.accountToPay = "Account number is required";
    } else if (!/^\d{10}$/.test(formData.accountToPay)) {
      newErrors.accountToPay = "Account number must be exactly 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    if (!uploadedImageUrl) {
      setUploadError("Please upload your payment receipt first");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step);
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFinalSubmit = async () => {
    if (!uploadedImageUrl) {
      setUploadError("Please upload payment proof first");
      return;
    }

    try {
      const ticketData = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        accountToPay: formData.accountToPay,
        imageUrl: uploadedImageUrl,
      };

      const response = await purchaseTicketMutation(ticketData);
      setIsComplete(true);
    } catch (error) {
      console.error("❌ Ticket purchase failed:", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3">
            <div className="text-center mb-3">
              <User className="w-6 h-6 mx-auto text-orange-500" />
              <h3 className="text-base font-semibold text-gray-900 mt-1">
                Personal Information
              </h3>
              <p className="text-xs text-gray-600">
                Please fill in your details
              </p>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={`${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:border-orange-400 focus:ring-orange-400 h-8 text-xs`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@gmail.com"
                  className={`${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-orange-400 focus:ring-orange-400 h-8 text-xs`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234 809 342 3456"
                  className={`${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:border-orange-400 focus:ring-orange-400 h-8 text-xs`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <Input
                  type="tel"
                  value={formData.accountToPay}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    handleInputChange("accountToPay", value);
                  }}
                  placeholder="e.g 1234567890"
                  className={`${
                    errors.accountToPay ? "border-red-500" : "border-gray-300"
                  } focus:border-orange-400 focus:ring-orange-400 h-8 text-xs`}
                />
                {errors.accountToPay && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.accountToPay}
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-2 rounded-lg">
                <h4 className="font-semibold text-xs text-gray-900">
                  Registration Fee
                </h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-600">
                    Art Speaks Here Ticket
                  </span>
                  <span className="font-bold text-base text-orange-600">
                    ₦5,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            <div className="text-center mb-3">
              <Upload className="w-6 h-6 mx-auto text-orange-500" />
              <h3 className="text-base font-semibold text-gray-900 mt-1">
                Upload Payment Proof
              </h3>
            </div>

            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-start space-x-2">
                <AlertCircle className="w-3 h-3 text-red-500 mt-0.5" />
                <p className="text-red-800 text-xs">{uploadError}</p>
              </div>
            )}

            {!uploadedImageUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                <ImageIcon className="w-6 h-6 text-gray-400 mx-auto" />
                <p className="text-xs text-gray-600 mt-2 mb-3">
                  {isUploading || isCloudinaryOpening
                    ? "Preparing upload..."
                    : "Click to upload payment receipt"}
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
                  onOpen={() => {
                    setIsCloudinaryOpening(true);
                    setUploadError(null);
                  }}
                  onSuccess={(results: CloudinaryUploadWidgetResults) => {
                    setIsCloudinaryOpening(false);
                    if (
                      results.info &&
                      typeof results.info === "object" &&
                      "secure_url" in results.info
                    ) {
                      const info = results.info;
                      setUploadedImageUrl(info.secure_url);
                      setUploadedImageId(info.public_id);
                      setUploadError(null);
                    }
                    setIsUploading(false);
                  }}
                  onError={(error: CloudinaryUploadWidgetError) => {
                    setIsCloudinaryOpening(false);
                    setUploadError("Upload failed. Please try again.");
                    setIsUploading(false);
                  }}
                  onUpload={() => {
                    setIsUploading(true);
                    setUploadError(null);
                  }}
                  className="w-full"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs h-7"
                    disabled={isCloudinaryOpening || isUploading}
                  >
                    {isCloudinaryOpening || isUploading ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      <>
                        <Upload className="w-3 h-3 mr-1" />
                        Choose Payment Receipt
                      </>
                    )}
                  </Button>
                </CldUploadButton>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <p className="text-green-800 text-xs">
                      Payment receipt uploaded!
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-1 bg-white">
                  <Image
                    src={uploadedImageUrl}
                    alt="Payment receipt"
                    width={250}
                    height={150}
                    className="w-full h-auto max-h-32 mx-auto rounded object-contain"
                  />
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => {
                      setUploadedImageUrl("");
                      setUploadedImageId("");
                    }}
                    variant="outline"
                    className="text-xs h-7"
                  >
                    Upload Different Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-3">
            <div className="text-center mb-2">
              <CheckCircle className="w-6 h-6 mx-auto text-orange-500" />
              <h3 className="text-sm font-semibold text-gray-900 mt-1">
                Review & Complete
              </h3>
              <p className="text-xs text-gray-600">
                Review your information before submitting
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-2 text-xs">
              <h4 className="font-semibold text-gray-900 mb-1">
                Your Information:
              </h4>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Name:</span> {formData.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {formData.phone}
                </p>
                <p>
                  <span className="font-medium">Account:</span>{" "}
                  {formData.accountToPay}
                </p>
              </div>
            </div>

            {uploadedImageUrl && (
              <div className="bg-gray-50 rounded-lg p-2">
                <h4 className="font-semibold text-xs text-gray-900 mb-1">
                  Payment Receipt:
                </h4>
                <div className="border rounded overflow-hidden">
                  <Image
                    src={uploadedImageUrl}
                    alt="Payment receipt"
                    width={200}
                    height={120}
                    className="w-full h-auto max-h-24 mx-auto object-contain"
                  />
                </div>
              </div>
            )}

            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-start space-x-2">
                <AlertCircle className="w-3 h-3 text-red-500 mt-0.5" />
                <p className="text-red-800 text-xs">{apiError}</p>
              </div>
            )}
          </div>
        );
    }
  };

  if (isComplete) {
    return (
      <section className="py-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-xs mx-auto px-4 w-full">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mt-2 text-center">
              Ticket Purchase Successful! 🎉
            </h2>
            <p className="text-xs text-gray-600 mt-2 text-center">
              You'll receive a confirmation email shortly.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-3">
              <p className="text-green-800 text-xs">
                <strong>Next Steps:</strong>
                <br />• Check your email
                <br />• Save your ticket
                <br />• Arrive on time
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-xs mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 p-3">
              <CardTitle className="flex items-center justify-between text-orange-700 text-sm">
                <div className="flex items-center">
                  <Ticket className="w-3 h-3 mr-1" />
                  <span>Register for Art Speaks Here</span>
                </div>
                <span className="text-xs">Step {currentStep} of 3</span>
              </CardTitle>

              <div className="flex items-center justify-between mt-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        currentStep >= step.number
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {currentStep > step.number ? "✓" : step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-6 h-1 mx-0.5 ${
                          currentStep > step.number
                            ? "bg-orange-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-3">
              <div className="max-h-[400px] overflow-y-auto">
                {renderStepContent()}
              </div>

              <div className="flex space-x-2 mt-4">
                {currentStep > 1 && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 text-xs h-7"
                  >
                    <ArrowLeft className="w-2.5 h-2.5 mr-1" />
                    Back
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs h-7"
                  >
                    Next
                    <ArrowRight className="w-2.5 h-2.5 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleFinalSubmit}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs h-7"
                    disabled={apiLoading}
                  >
                    {apiLoading ? (
                      <>
                        <Loader2 className="w-2.5 h-2.5 mr-1 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-2.5 h-2.5 mr-1" />
                        Complete
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}