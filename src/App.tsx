import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { IncomeManagement } from "./components/IncomeManagement";
import { ExpenseManagement } from "./components/ExpenseManagement";
import { SavingsGoals } from "./components/SavingsGoals";
import { Reports } from "./components/Reports";
import { Recommendations } from "./components/Recommendations";
import { Support } from "./components/Support";
import { Settings } from "./components/Settings";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminUsers } from "./components/AdminUsers";
import { AdminSupport } from "./components/AdminSupport";
import { AdminAnalytics } from "./components/AdminAnalytics";
import { AdminSettings } from "./components/AdminSettings";
import { AuthProvider, useAuth } from "./hooks/useAuth.tsx";
import { VerifyEmailScreen } from "./components/VerifyEmailScreen";

// Layout Components
function UserLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar onLogout={logout} />
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 overflow-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar onLogout={logout} />
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 overflow-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode; 
  requiredRole?: "user" | "admin";
}) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole === "admin" && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          user ? (
            <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
          ) : (
            <>
              <LoginScreen />
              <Toaster />
            </>
          )
        } 
      />
      <Route 
        path="/register" 
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <>
              <RegisterScreen />
              <Toaster />
            </>
          )
        } 
      />
      <Route
        path="/verify-email"
        element={<VerifyEmailScreen />}
      />

      {/* User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Dashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/income"
        element={
          <ProtectedRoute>
            <UserLayout>
              <IncomeManagement />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <UserLayout>
              <ExpenseManagement />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <UserLayout>
              <SavingsGoals />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Reports />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Recommendations />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Support />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Settings />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/support"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminSupport />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminAnalytics />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}