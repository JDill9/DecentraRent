// src/context/AuthContext.tsx

// We're using React’s createContext + hooks to manage global auth state
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode, // type-only import for the children prop
} from "react";

// Define the two roles our app supports
export type Role = "tenant" | "landlord";

// Shape of the authentication state we store
interface AuthState {
  isLoggedIn: boolean;   // whether the user is authenticated
  role?: Role;           // the user’s role, once logged in
  email?: string;        // email (we're using wallet as id, but left here for flexibility)
  wallet?: string;       // connected MetaMask address
  uid?: string;
}

// Extend AuthState with the actions we need
interface AuthContextType extends AuthState {
  // Call this to mark the user as logged in
  login: (role: Role, email: string, wallet: string) => void;
  // Call this to log out (clear everything)
  logout: () => void;
}

// Create the context; default is undefined so we can enforce usage within a provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and makes auth state available via context
export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state: not logged in
  const [state, setState] = useState<AuthState>({ isLoggedIn: false });

  // Rehydrate login state from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.wallet && parsed.role) {
          setState({
            isLoggedIn: true,
            wallet: parsed.wallet,
            role: parsed.role,
            email: parsed.email,
            uid: parsed.uid,
          });
        }
      } catch (err) {
        console.warn("Failed to parse auth from storage:", err);
      }
    }
  }, []);

  // login() updates state to include the user’s role, email, and wallet
  const login = (role: Role, email: string, wallet: string) => {
    const next = { isLoggedIn: true, role, email, wallet };
    setState(next);
    localStorage.setItem("auth", JSON.stringify(next)); // Save to localStorage
  };

  // logout() resets state back to “not logged in”
  const logout = () => {
    setState({ isLoggedIn: false });
    localStorage.removeItem("auth"); // Clear saved auth
  };

  return (
    // Expose both state and actions to all consumers
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for ease of use in components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // This enforces that useAuth must be used inside <AuthProvider>
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
