"use server"

import { cloudinaryConfig } from "@/lib/cloudinary"

export async function uploadToCloudinary(formData: FormData) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`

    // Upload to Cloudinary
    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: base64File,
        upload_preset: cloudinaryConfig.uploadPreset,
        folder: "payment-receipts", // Organize uploads in a folder
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" }, // Optimize image size
          { quality: "auto" }, // Auto quality optimization
          { format: "auto" }, // Auto format optimization
        ],
      }),
    })

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json()
      throw new Error(`Cloudinary upload failed: ${errorData.error?.message || "Unknown error"}`)
    }

    const result = await uploadResponse.json()

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    }
  }
}
