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
import { ReceiptsViewer } from "./components/ReceiptsViewer";
import { LoginForm } from "./components/LoginForm";
import { CreateAccount } from "./components/CreateAccount";
import Payments from "./components/Payments";
import MyLeases from "./components/MyLeases"; 
import Properties from "./components/Properties";
import Account from "./components/Account";
import Support from "./components/Support";
import About from "./components/About";
import Navbar from "./components/Navbar";

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
  const { isLoggedIn } = useAuth(); // Access auth state to conditionally show navbar

  return (
    <>
      {/* Navbar appears on top for authenticated users */}
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/leases" element={<LeasePage />} />
        <Route path="/receipts" element={<ReceiptsViewer />} />

        {/* General authenticated pages (Navbar visible if isLoggedIn is true) */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/myleases" element={<MyLeases />} /> 
        <Route path="/properties" element={<Properties />} />
        <Route path="/account" element={<Account />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />

        {/* Role-specific dashboards */}
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
