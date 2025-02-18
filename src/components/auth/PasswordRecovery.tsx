import { useState, FormEvent } from "react";
import { Client, Account } from "appwrite";

function PasswordRecovery() {
  const [email, setEmail] = useState<string>("");
  const [recoveryMessage, setRecoveryMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRecovery = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setRecoveryMessage(""); // Clear previous messages

    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) //  endpoint
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT); //project ID

    const account = new Account(client);

    try {
      const response = await account.createRecovery(
        email,
        `${window.location.origin}/recovery` // Use the current origin
      );
      console.log(response);
      setRecoveryMessage("Recovery email sent. Please check your inbox.");
    } catch (error: any) {
      console.error("Recovery error:", error);
      setErrorMessage(error.message || "Failed to send recovery email.");
    }
  };

  return (
    <div>
      {recoveryMessage && <p style={{ color: "green" }}>{recoveryMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleRecovery}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button type="submit">Recover Password</button>
      </form>
    </div>
  );
}

export default PasswordRecovery;