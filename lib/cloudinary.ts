export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  apiSecret: process.env.CLOUDINARY_API_SECRET!,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
}

export const generateSignature = (params: Record<string, any>, apiSecret: string) => {
  const crypto = require("crypto")
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&")

  return crypto
    .createHash("sha1")
    .update(sortedParams + apiSecret)
    .digest("hex")
}
