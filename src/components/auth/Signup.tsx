import { useState, FormEvent } from "react";
import { Client, Account, ID } from "appwrite";
import { useNavigate } from "react-router-dom";
interface SignupProps {
    onLoginSuccess: () => void;
  }
  
  function Signup({ onLoginSuccess }: SignupProps) { // Destructure props
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    // const navigate = useNavigate();
  
    const handleSignup = async (e: FormEvent) => {
      e.preventDefault();
      setErrorMessage("");
  
      const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT);
  
      const account = new Account(client);
  
      try {
        await account.create(ID.unique(), email, password);
        await account.createEmailPasswordSession(email, password); // Auto-login
        onLoginSuccess();
      } catch (error: any) {
        console.error("Signup error:", error);
        setErrorMessage(error.message || "Signup failed.");
      }
    };
  
    return (
      <div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleSignup}>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
  
  export default Signup;