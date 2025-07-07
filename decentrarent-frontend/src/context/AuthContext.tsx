import { createContext, useContext, useEffect, useState } from "react";

// Export Role type
export type Role = "tenant" | "landlord";

interface AuthContextType {
  isLoggedIn: boolean;
  wallet: string;
  role: Role | null;
  username: string;
  login: (
    role: Role,
    displayName: string,
    wallet: string,
    username?: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setWallet(parsed.wallet);
      setRole(parsed.role);
      setUsername(parsed.username);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (
    role: Role,
    displayName: string,
    wallet: string,
    usernameOverride?: string
  ) => {
    const finalUsername = usernameOverride || displayName;
    setWallet(wallet);
    setRole(role);
    setUsername(finalUsername);
    setIsLoggedIn(true);
    localStorage.setItem(
      "auth",
      JSON.stringify({ wallet, role, username: finalUsername })
    );
  };

  const logout = () => {
    setWallet("");
    setRole(null);
    setUsername("");
    setIsLoggedIn(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, wallet, role, login, logout, username }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
