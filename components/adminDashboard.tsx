"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  LogOut,
  RefreshCw,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  Search,
} from "lucide-react"

import Image from "next/image"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { useAdminTickets } from "@/lib/use-admin-ticket"
import { Ticket } from "@/lib/admin-api"


export default function AdminDashboard() {
  const { user, logout } = useAdminAuth()
  const {
    tickets,
    pagination,
    isLoading,
    error,
    refreshTickets,
    approveTicketById,
    rejectTicketById,
    loadPage,
    clearError,
  } = useAdminTickets()

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    }
  }

  const handleApprove = async (ticketId: number) => {
    setActionLoading(ticketId)
    try {
      await approveTicketById(ticketId)
    } catch (error) {
      console.error("Failed to approve ticket:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (ticketId: number) => {
    setActionLoading(ticketId)
    try {
      await rejectTicketById(ticketId)
    } catch (error) {
      console.error("Failed to reject ticket:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const stats = {
    total: pagination?.total || 0,
    pending: tickets.filter((t) => t.status === "pending").length,
    approved: tickets.filter((t) => t.status === "approved").length,
    rejected: tickets.filter((t) => t.status === "rejected").length,
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesSearch =
      ticket.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.phone.includes(searchQuery) ||
      ticket.id.toString().includes(searchQuery)

    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.email}</span>
              </div>
              <Button onClick={logout} variant="outline" size="sm" className="bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Ticket Bookings
              </CardTitle>
              <Button
                onClick={refreshTickets}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 text-sm">{error}</p>
                  <Button onClick={clearError} variant="outline" size="sm" className="mt-2 bg-transparent">
                    Dismiss
                  </Button>
                </div>
              </div>
            )}

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {(statusFilter !== "all" || searchQuery) && (
                <Button
                  onClick={() => {
                    setStatusFilter("all")
                    setSearchQuery("")
                  }}
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Results Counter */}
            {(statusFilter !== "all" || searchQuery) && (
              <div className="text-sm text-gray-600 mb-4">
                Showing {filteredTickets.length} of {tickets.length} tickets
              </div>
            )}

            {/* Loading State */}
            {isLoading && tickets.length === 0 ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Loading tickets...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  {tickets.length === 0 ? "No tickets found" : "No tickets match your filters"}
                </p>
              </div>
            ) : (
              <>
                {/* Tickets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket number</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-1 font-sm text-gray-900 truncate">{ticket.ticketNumber}</td>
                          <td className="py-4 px-4 text-gray-900">{ticket.fullName}</td>
                          <td className="py-4 px-4 text-gray-600">{ticket.email}</td>
                          <td className="py-4 px-4 text-gray-600">{ticket.phone}</td>
                          <td className="py-4 px-4">{getStatusBadge(ticket.status)}</td>
                          <td className="py-4 px-4 text-gray-600 text-sm">{formatDate(ticket.createdAt)}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => setSelectedTicket(ticket)}
                                variant="outline"
                                size="sm"
                                className="bg-transparent"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>

                              {(ticket.status === "pending" || ticket.status === "approved") && (
                                <Button
                                  onClick={() => handleApprove(ticket.id)}
                                  disabled={actionLoading === ticket.id}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  title={ticket.status === "approved" ? "Resend approval email" : "Approve ticket"}
                                >
                                  {actionLoading === ticket.id ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                </Button>
                              )}

                              {ticket.status === "pending" && (
                                <Button
                                  onClick={() => handleReject(ticket.id)}
                                  disabled={actionLoading === ticket.id}
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  {actionLoading === ticket.id ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <X className="w-4 h-4" />
                                  )}
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600">
                      Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                      {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => loadPage(pagination.page - 1)}
                        disabled={pagination.page <= 1 || isLoading}
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <Button
                        onClick={() => loadPage(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages || isLoading}
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Ticket Details #{selectedTicket.id}</h2>
                <Button onClick={() => setSelectedTicket(null)} variant="outline" size="sm" className="bg-transparent">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  {getStatusBadge(selectedTicket.status)}
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-gray-900 font-medium">{selectedTicket.fullName}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </label>
                      <p className="text-gray-900">{selectedTicket.email}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        Phone
                      </label>
                      <p className="text-gray-900">{selectedTicket.phone}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        Account Number
                      </label>
                      <p className="text-gray-900">{selectedTicket.accountToPay}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created At
                      </label>
                      <p className="text-gray-900">{formatDate(selectedTicket.createdAt)}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Updated At
                      </label>
                      <p className="text-gray-900">{formatDate(selectedTicket.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Receipt */}
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Payment Receipt</label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <Image
                      src={selectedTicket.imageUrl || "/placeholder.svg"}
                      alt="Payment receipt"
                      width={400}
                      height={300}
                      className="max-w-full h-auto rounded border bg-white"
                    />
                  </div>
                </div>

                {/* Actions */}
                {(selectedTicket.status === "pending" || selectedTicket.status === "approved") && (
                  <div className="flex space-x-4 pt-4 border-t">
                    <Button
                      onClick={() => {
                        handleApprove(selectedTicket.id)
                        setSelectedTicket(null)
                      }}
                      disabled={actionLoading === selectedTicket.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      {actionLoading === selectedTicket.id ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      {selectedTicket.status === "approved" ? "Resend Approval Email" : "Approve Ticket"}
                    </Button>

                    {selectedTicket.status === "pending" && (
                      <Button
                        onClick={() => {
                          handleReject(selectedTicket.id)
                          setSelectedTicket(null)
                        }}
                        disabled={actionLoading === selectedTicket.id}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        {actionLoading === selectedTicket.id ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <X className="w-4 h-4 mr-2" />
                        )}
                        Reject Ticket
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
