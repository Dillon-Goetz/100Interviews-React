// Login.tsx
import React, { useState, FormEvent } from "react";
import { Client, Account } from "appwrite";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

    const account = new Account(client);

    try {
      try {
        await account.get(); // Check for existing session
        // Session exists, either delete or skip
        await account.deleteSession("current"); //delete existing session.
      } catch (sessionError) {
        // No session exists, proceed with login
      }
      await account.createEmailPasswordSession(email, password);
      onLoginSuccess();
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Login failed.");
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;