"use client"

import { useState, useEffect } from "react"
import { adminLogin, AdminLoginRequest, AdminUser, getAdminUser, isAdminAuthenticated } from "./admin-api"


interface UseAdminAuthReturn {
  login: (credentials: AdminLoginRequest) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  user: AdminUser | null
  clearError: () => void
}

export function useAdminAuth(): UseAdminAuthReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    // Check if user is already authenticated on mount
    const authenticated = isAdminAuthenticated()
    const currentUser = getAdminUser()

    setIsAuthenticated(authenticated)
    setUser(currentUser)
  }, [])

  const login = async (credentials: AdminLoginRequest): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await adminLogin(credentials)

      if (response.responseSuccessful) {
        setIsAuthenticated(true)
        setUser(response.responseBody.user)
      } else {
        throw new Error(response.responseMessage || "Login failed")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    setIsAuthenticated(false)
    setUser(null)
    window.location.href = "/aisha/login"
  }

  const clearError = () => {
    setError(null)
  }

  return {
    login,
    logout,
    isLoading,
    error,
    isAuthenticated,
    user,
    clearError,
  }
}
