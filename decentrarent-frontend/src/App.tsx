import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Login } from "./components/Login";
import { TenantDashboard } from "./components/TenantDashboard";
import { LandlordDashboard } from "./components/LandlordDashboard";
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

  if (!auth.isLoggedIn || auth.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-form" element={<LoginForm />} />
      <Route path="/google-login" element={<GoogleLogin />} />
      <Route path="/leases" element={<LeasePage />} />
      <Route path="/receipts" element={<ReceiptsViewer />} />

      <Route
        path="/tenant"
        element={
          <PrivateRoute allowedRole="tenant">
            <TenantDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/landlord"
        element={
          <PrivateRoute allowedRole="landlord">
            <LandlordDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
