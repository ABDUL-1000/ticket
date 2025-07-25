"use client"

import { useState } from "react"
import { purchaseTicket, TicketPurchaseRequest, TicketPurchaseResponse } from "./api"


interface UseTicketPurchaseReturn {
  purchaseTicketMutation: (data: TicketPurchaseRequest) => Promise<TicketPurchaseResponse>
  isLoading: boolean
  error: string | null
  success: boolean
  reset: () => void
}

export function useTicketPurchase(): UseTicketPurchaseReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const purchaseTicketMutation = async (data: TicketPurchaseRequest): Promise<TicketPurchaseResponse> => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await purchaseTicket(data)

      if (response.responseSuccessful) {
        setSuccess(true)
        return response
      } else {
        throw new Error(response.responseMessage || "Ticket purchase failed")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {
    purchaseTicketMutation,
    isLoading,
    error,
    success,
    reset,
  }
}
