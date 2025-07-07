// src/App.tsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Login } from "./components/Login";
import { TenantDashboard } from "./components/TenantDashboard";
import { LandlordDashboard } from "./components/LandlordDashboard";

// NEW IMPORTS
import { GoogleLogin } from "./components/GoogleLogin";
import { LeasePage } from "./components/LeasePage";
import { ReceiptsViewer } from "./components/Receipts";
import { LoginForm } from "./components/LoginForm";

function PrivateRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: "tenant" | "landlord";
}) {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Public login page */}
      <Route path="/login" element={<Login />} />

      <Route path="/login-form" element={<LoginForm />} />

      {/* Public Google login route */}
      <Route path="/google-login" element={<GoogleLogin />} />

      {/* Public Lease viewer route */}
      <Route path="/leases" element={<LeasePage />} />

      {/* Public Receipt viewer route */}
      <Route path="/receipts" element={<ReceiptsViewer />} />

      {/* Tenant-only dashboard */}
      <Route
        path="/tenant"
        element={
          <PrivateRoute allowedRole="tenant">
            <TenantDashboard />
          </PrivateRoute>
        }
      />

      {/* Landlord-only dashboard */}
      <Route
        path="/landlord"
        element={
          <PrivateRoute allowedRole="landlord">
            <LandlordDashboard />
          </PrivateRoute>
        }
      />

      {/* Catch-all: redirect unknown URLs to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
