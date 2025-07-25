// "use client"
// import { useState } from "react"
// import { CldUploadButton } from "next-cloudinary"
// import type { CloudinaryUploadWidgetResults, CloudinaryUploadWidgetError } from "next-cloudinary"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { CheckCircle, Upload, ImageIcon, AlertCircle } from "lucide-react"
// import { useScrollAnimation } from "@/lib/use-scrol-animation"
// import Image from "next/image"

// interface PaymentUploadProps {
//   onUpload: (uploadResult: { url: string; publicId: string }) => void
//   onSuccess: () => void
// }

// export default function PaymentUploadExplicitTypes({ onUpload, onSuccess }: PaymentUploadProps) {
//   const { ref: uploadRef, isVisible: uploadVisible } = useScrollAnimation(0.1)
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
//   const [uploadSuccess, setUploadSuccess] = useState(false)
//   const [uploadError, setUploadError] = useState<string | null>(null)
//   const [isUploading, setIsUploading] = useState(false)

//   return (
//     <section className="py-12 sm:py-16 bg-gray-50 min-h-screen scroll-smooth">
//       <div className="container mx-auto px-4">
//         <div className="max-w-2xl mx-auto">
//           {uploadSuccess ? (
//             <div className="text-center">
//               <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
//                   <CheckCircle className="w-10 h-10 text-green-500" />
//                 </div>
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
//                   Payment Proof Uploaded Successfully!
//                 </h2>
//                 <p className="text-sm sm:text-base text-gray-600 mb-6">
//                   Thank you for your payment. We'll verify your payment and send you a confirmation email within 24
//                   hours.
//                 </p>

//                 {uploadedImage && (
//                   <div className="mb-6">
//                     <Image
//                       src={uploadedImage || "/placeholder.svg"}
//                       alt="Uploaded payment receipt"
//                       width={300}
//                       height={200}
//                       className="mx-auto rounded-lg border shadow-sm"
//                     />
//                   </div>
//                 )}

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <p className="text-blue-800 text-sm">
//                     <strong>Next Steps:</strong>
//                     <br />• You'll receive an email confirmation once payment is verified
//                     <br />• Your event ticket will be sent to your registered email
//                     <br />• Keep your ticket for event entry
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div
//                 className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${
//                   uploadVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
//                 }`}
//               >
//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
//                   Upload Payment Proof
//                 </h2>
//                 <p className="text-sm sm:text-base text-gray-600">
//                   Please upload a clear screenshot or photo of your payment receipt
//                 </p>
//               </div>

//               <div ref={uploadRef}>
//                 <Card
//                   className={`shadow-lg hover:shadow-xl transition-all duration-500 ${
//                     uploadVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//                   }`}
//                 >
//                   <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
//                     <CardTitle className="flex items-center text-lg sm:text-xl">
//                       <Upload className="w-5 h-5 mr-2 animate-pulse" />
//                       Payment Receipt
//                     </CardTitle>
//                   </CardHeader>

//                   <CardContent className="p-4 sm:p-6">
//                     <div className="space-y-4 sm:space-y-6">
//                       {/* Upload Instructions */}
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
//                         <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Upload Guidelines:</h4>
//                         <ul className="text-blue-800 text-xs sm:text-sm space-y-1">
//                           <li>• Upload a clear image of your payment receipt</li>
//                           <li>• Ensure all transaction details are visible</li>
//                           <li>• Supported formats: JPG, PNG, GIF</li>
//                           <li>• Maximum file size: 10MB</li>
//                           <li>• Images are automatically optimized and securely stored</li>
//                         </ul>
//                       </div>

//                       {/* Error Display */}
//                       {uploadError && (
//                         <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start space-x-2">
//                           <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//                           <p className="text-red-800 text-sm">{uploadError}</p>
//                         </div>
//                       )}

//                       {/* Upload Area */}
//                       <div className="space-y-4">
//                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-orange-400 transition-colors">
//                           <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
//                           <p className="text-gray-600 mb-4 text-sm sm:text-base">
//                             {isUploading
//                               ? "Uploading your payment receipt..."
//                               : "Click below to upload your payment receipt"}
//                           </p>

//                           <CldUploadButton
//                             uploadPreset="payment-upload"
//                             options={{
//                               maxFiles: 1,
//                               folder: "payment-receipts",
//                               resourceType: "image",
//                               maxFileSize: 10000000,
//                               sources: ["local", "camera"],
//                               multiple: false,
//                               clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
//                             }}
//                             onSuccess={(results: CloudinaryUploadWidgetResults) => {
//                               console.log("✅ Upload successful:", results)

//                               if (results.info && typeof results.info === "object" && "secure_url" in results.info) {
//                                 const info = results.info
//                                 setUploadedImage(info.secure_url)

//                                 // First, call onUpload to set the image URL in parent component
//                                 onUpload({
//                                   url: info.secure_url,
//                                   publicId: info.public_id,
//                                 })

//                                 // Then set local success state
//                                 setUploadSuccess(true)

//                                 // Finally, call onSuccess after a short delay to ensure image URL is set
//                                 setTimeout(() => {
//                                   onSuccess()
//                                 }, 500)
//                               }
//                               setIsUploading(false)
//                             }}
//                             onError={(error: CloudinaryUploadWidgetError) => {
//                               console.error("❌ Upload failed:", error)
//                               setUploadError("Upload failed. Please check your file and try again.")
//                               setIsUploading(false)
//                             }}
//                             onUpload={() => {
//                               setIsUploading(true)
//                               setUploadError(null)
//                             }}
//                             className="w-full"
//                           >
//                             <Button
//                               className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-medium text-base sm:text-lg transform hover:scale-105 hover:shadow-lg transition-all duration-300"
//                               size="lg"
//                               disabled={isUploading}
//                             >
//                               {isUploading ? (
//                                 <>
//                                   <Upload className="w-4 h-4 mr-2 animate-spin" />
//                                   Uploading...
//                                 </>
//                               ) : (
//                                 <>
//                                   <Upload className="w-4 h-4 mr-2" />
//                                   Choose Payment Receipt
//                                 </>
//                               )}
//                             </Button>
//                           </CldUploadButton>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }
