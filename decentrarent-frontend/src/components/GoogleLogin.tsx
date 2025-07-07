import { signInWithPopup, provider, auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function GoogleLogin() {
  const nav = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      login("tenant", user.email || "unknown", user.uid);
      nav("/tenant");
    } catch (err) {
      console.error("Google Login failed", err);
      alert("Google login error.");
    }
  };

  return (
    <div>
      <h3>Google Sign-In</h3>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}
