// src/App.tsx

// Import React so we can use React.ReactNode
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Login } from "./components/Login";
import { TenantDashboard } from "./components/TenantDashboard";
import { LandlordDashboard } from "./components/LandlordDashboard";

/**
 * PrivateRoute:
 *  - children: any React nodes (pages/components)
 *  - allowedRole: either "tenant" or "landlord"
 *
 * Redirects to /login if:
 *  1) not logged in
 *  2) logged in but wrong role
 */
function PrivateRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;                // use React.ReactNode instead of JSX.Element
  allowedRole: "tenant" | "landlord";
}) {
  const auth = useAuth();

  // 1) Not logged in → force login
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2) Wrong role → force login (or you could show a 403 page)
  if (auth.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // Authorized → render the page
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Public login page */}
      <Route path="/login" element={<Login />} />

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
