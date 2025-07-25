import AdminDashboard from "@/components/adminDashboard";
import AdminProtectedRoute from "@/components/adminProtectedRoute";


export default function AdminDashboardPage() {
  return (
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  )
}
