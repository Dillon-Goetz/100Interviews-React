// src/components/auth/AuthPage.tsx
import { useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import "../../styles/AuthPage.css"; //css styling
import { Models } from "appwrite";
import { account } from "../../appwriteConfig";

// Initialize Appwrite client

interface AuthPageProps {
  mode: "login" | "signup";
  toggleMode: () => void;
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

const AuthPage = ({ mode, toggleMode, onLoginSuccess }: AuthPageProps) => {
  useEffect(() => {
    // Check if the user is already logged in
    const checkSession = async () => {
      try {
        const user = await account.get();
        onLoginSuccess(user);  // If already logged in, pass user to parent
      } catch (err) {
        // No session found, so allow login or signup
        console.log("No active session found.");
      }
    };

    checkSession();
  }, [onLoginSuccess]);
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        {mode === "login" ? (
          <>
            <Login onLoginSuccess={onLoginSuccess} account={account} />
            <p className="auth-switch">
              Don't have an account?{" "}
              <button onClick={toggleMode} className="auth-switch-btn">
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <Signup onLoginSuccess={onLoginSuccess} account={account} />
            <p className="auth-switch">
              Already have an account?{" "}
              <button onClick={toggleMode} className="auth-switch-btn">
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;