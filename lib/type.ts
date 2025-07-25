export interface BookingFormData {
  name: string
  email: string
  phone: string
  ticketType: string
}

export interface PaymentDetails {
  accountName: string
  accountNumber: string
  bankName: string
  amount: number
}

export interface BookingData extends BookingFormData {
  id: string
  paymentStatus: "pending" | "uploaded" | "verified"
  paymentProof?: File
  createdAt: Date
}
