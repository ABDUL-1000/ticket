import axios from "axios"

// Define the base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
console.log(BASE_URL, 'base url')

// Create axios instance for admin API
const adminApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
adminApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
      window.location.href = "/aisha/login"
    }
    console.error("Admin API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

// Types
export interface AdminLoginRequest {
  email: string
  password: string
}

export interface AdminUser {
  id: number
  email: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface AdminLoginResponse {
  responseSuccessful: boolean
  responseMessage: string
  responseBody: {
    user: AdminUser
    accessToken: string
  }
}

export interface Ticket {
  id: number
  ticketNumber: string
  fullName: string
  email: string
  phone: string
  accountToPay: string
  imageUrl: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
}

export interface TicketsResponse {
  responseSuccessful: boolean
  responseMessage: string
  responseBody: {
    tickets: Ticket[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}

export interface ApproveTicketResponse {
  responseSuccessful: boolean
  responseMessage: string
  responseBody?: any
}

// API Functions
export const adminLogin = async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
  try {
    console.log("🔐 Admin login attempt:", { email: credentials.email })

    const response = await adminApiClient.post<AdminLoginResponse>("/api/v1/user/ticket/login", credentials)

    console.log("✅ Admin login successful:", response.data)

    // Store token and user info
    if (response.data.responseSuccessful && response.data.responseBody.accessToken) {
      localStorage.setItem("adminToken", response.data.responseBody.accessToken)
      localStorage.setItem("adminUser", JSON.stringify(response.data.responseBody.user))
    }

    return response.data
  } catch (error) {
    console.error("❌ Admin login failed:", error)

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data?.responseMessage || `Login failed: ${error.response.status}`)
      } else if (error.request) {
        throw new Error("Network error: Unable to reach server")
      }
    }

    throw new Error("Login failed. Please try again.")
  }
}

export const getAllTickets = async (page = 1, limit = 10): Promise<TicketsResponse> => {
  try {
    console.log("📋 Fetching tickets:", { page, limit })

    const response = await adminApiClient.get<TicketsResponse>(`/api/v1/user/ticket?page=${page}&limit=${limit}`)

    console.log("✅ Tickets fetched:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Failed to fetch tickets:", error)

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data?.responseMessage || `Failed to fetch tickets: ${error.response.status}`)
      } else if (error.request) {
        throw new Error("Network error: Unable to reach server")
      }
    }

    throw new Error("Failed to fetch tickets. Please try again.")
  }
}

export const approveTicket = async (ticketId: number): Promise<ApproveTicketResponse> => {
  try {
    console.log("✅ Approving ticket:", ticketId)

    const response = await adminApiClient.put<ApproveTicketResponse>(`/api/v1/user/ticket/${ticketId}`)

    console.log("✅ Ticket approved:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Failed to approve ticket:", error)

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data?.responseMessage || `Failed to approve ticket: ${error.response.status}`)
      } else if (error.request) {
        throw new Error("Network error: Unable to reach server")
      }
    }

    throw new Error("Failed to approve ticket. Please try again.")
  }
}

export const rejectTicket = async (ticketId: number): Promise<ApproveTicketResponse> => {
  try {
    console.log("❌ Rejecting ticket:", ticketId)

    const response = await adminApiClient.put<ApproveTicketResponse>(`/api/v1/user/ticket/${ticketId}/reject`)

    console.log("✅ Ticket rejected:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Failed to reject ticket:", error)

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data?.responseMessage || `Failed to reject ticket: ${error.response.status}`)
      } else if (error.request) {
        throw new Error("Network error: Unable to reach server")
      }
    }

    throw new Error("Failed to reject ticket. Please try again.")
  }
}

// Utility functions
export const isAdminAuthenticated = (): boolean => {
  const token = localStorage.getItem("adminToken")
  const user = localStorage.getItem("adminUser")
  return !!(token && user)
}

export const getAdminUser = (): AdminUser | null => {
  const userStr = localStorage.getItem("adminUser")
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch (error) {
      console.error("Failed to parse admin user:", error)
      return null
    }
  }
  return null
}

export const adminLogout = (): void => {
  localStorage.removeItem("adminToken")
  localStorage.removeItem("adminUser")
  window.location.href = "/aisha/login"
}
