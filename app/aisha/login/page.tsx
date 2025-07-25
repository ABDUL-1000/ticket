"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-api"
import AdminLogin from "@/components/adminLogin"


export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAdminAuthenticated()) {
      router.push("/admin/dashboard")
    }
  }, [router])

  return <AdminLogin />
}
