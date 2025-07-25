"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugEnv() {
  const checkEnvVars = () => {
    console.log("=== Environment Variables Debug ===")
    console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
    console.log("API Key:", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
    console.log("Upload Preset:", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    console.log("API Secret (should be undefined on client):", process.env.CLOUDINARY_API_SECRET)

    // Check if they're undefined
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error("❌ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not loaded!")
    }
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY) {
      console.error("❌ NEXT_PUBLIC_CLOUDINARY_API_KEY is not loaded!")
    }
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      console.error("❌ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not loaded!")
    }
  }

  const testCloudinaryConnection = async () => {
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      console.log("Testing with:", { cloudName, uploadPreset })

      // Test with a tiny 1x1 pixel image
      const testImage =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: testImage,
          upload_preset: uploadPreset,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        console.log("✅ Cloudinary test successful:", result)
        alert("✅ Cloudinary connection successful!")
      } else {
        console.error("❌ Cloudinary test failed:", result)
        alert(`❌ Cloudinary test failed: ${result.error?.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("❌ Connection error:", error)
      alert(`❌ Connection error: ${error}`)
    }
  }

  return (
    <Card className="max-w-md mx-auto m-4">
      <CardHeader>
        <CardTitle>Debug Cloudinary Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={checkEnvVars} variant="outline" className="w-full bg-transparent">
          Check Environment Variables
        </Button>
        <Button onClick={testCloudinaryConnection} className="w-full">
          Test Cloudinary Connection
        </Button>
        <div className="text-xs text-gray-600">
          <p>Check the browser console for detailed output</p>
        </div>
      </CardContent>
    </Card>
  )
}
