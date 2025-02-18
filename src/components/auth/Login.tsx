// Login.tsx
import { useState, FormEvent } from "react";
import { Client, Account, Models } from "appwrite";

interface LoginProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

    const account = new Account(client);

    try {
      try {
        await account.get();
        await account.deleteSession("current");
      } catch (sessionError) {
        // No session exists, proceed with login
      }
      await account.createEmailPasswordSession(email, password);
      const user = await account.get(); // Fetch the user object
      onLoginSuccess(user); // Pass the fetched user object
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