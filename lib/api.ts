import axios from "axios"

// Define the base URL - you can set this in your environment variables
const BASE_URL ="https://simkashapi.onrender.com"

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor (optional - for adding auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor (optional - for handling common errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

// Types for the API
export interface TicketPurchaseRequest {
  fullName: string
  email: string
  phone: string
  accountToPay: string
  imageUrl: string
}

export interface TicketPurchaseResponse {
  responseSuccessful: boolean
  responseMessage: string
}

// API function to purchase ticket
export const purchaseTicket = async (data: TicketPurchaseRequest): Promise<TicketPurchaseResponse> => {
  try {
    console.log("🚀 Sending ticket purchase request:", data)

    const response = await apiClient.post<TicketPurchaseResponse>("/api/v1/user/ticket", data)

    console.log("✅ Ticket purchase response:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Ticket purchase failed:", error)

    if (axios.isAxiosError(error)) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data?.responseMessage || `Server error: ${error.response.status}`)
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("Network error: Unable to reach server")
      } else {
        // Something else happened
        throw new Error(`Request error: ${error.message}`)
      }
    }

    throw new Error("An unexpected error occurred")
  }
}

// Optional: Function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get("/health")
    return true
  } catch (error) {
    console.error("API health check failed:", error)
    return false
  }
}
