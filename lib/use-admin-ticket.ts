"use client"

import { useState, useEffect } from "react"
import { getAllTickets, approveTicket, rejectTicket, type Ticket } from "./admin-api"

interface UseAdminTicketsReturn {
  tickets: Ticket[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  isLoading: boolean
  error: string | null
  refreshTickets: () => Promise<void>
  approveTicketById: (ticketId: number) => Promise<void>
  rejectTicketById: (ticketId: number) => Promise<void>
  loadPage: (page: number) => Promise<void>
  clearError: () => void
}

export function useAdminTickets(initialPage = 1, limit = 10): UseAdminTicketsReturn {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [pagination, setPagination] = useState<{
    page: number
    limit: number
    total: number
    totalPages: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(initialPage)

  const fetchTickets = async (page: number = currentPage) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getAllTickets(page, limit)

      if (response.responseSuccessful) {
        setTickets(response.responseBody.tickets)
        setPagination(response.responseBody.pagination)
        setCurrentPage(page)
      } else {
        throw new Error(response.responseMessage || "Failed to fetch tickets")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch tickets"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const approveTicketById = async (ticketId: number) => {
    try {
      setError(null)
      const response = await approveTicket(ticketId)

      if (response.responseSuccessful) {
        // Update the ticket status locally
        setTickets((prev) =>
          prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: "approved" as const } : ticket)),
        )
      } else {
        throw new Error(response.responseMessage || "Failed to approve ticket")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to approve ticket"
      setError(errorMessage)
      throw err
    }
  }

  const rejectTicketById = async (ticketId: number) => {
    try {
      setError(null)
      const response = await rejectTicket(ticketId)

      if (response.responseSuccessful) {
        // Update the ticket status locally
        setTickets((prev) =>
          prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: "rejected" as const } : ticket)),
        )
      } else {
        throw new Error(response.responseMessage || "Failed to reject ticket")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reject ticket"
      setError(errorMessage)
      throw err
    }
  }

  const loadPage = async (page: number) => {
    await fetchTickets(page)
  }

  const refreshTickets = async () => {
    await fetchTickets(currentPage)
  }

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    fetchTickets(initialPage)
  }, [])

  return {
    tickets,
    pagination,
    isLoading,
    error,
    refreshTickets,
    approveTicketById,
    rejectTicketById,
    loadPage,
    clearError,
  }
}
