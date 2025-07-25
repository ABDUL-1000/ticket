"use client"

import { useState } from "react"
import { uploadToCloudinary } from "./upload-to-cloudinary"


interface UploadResult {
  success: boolean
  url?: string
  publicId?: string
  error?: string
}

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadFile = async (file: File): Promise<UploadResult> => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadToCloudinary(formData)

      clearInterval(progressInterval)
      setUploadProgress(100)

      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      }
    } finally {
      setIsUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  return {
    uploadFile,
    isUploading,
    uploadProgress,
  }
}
