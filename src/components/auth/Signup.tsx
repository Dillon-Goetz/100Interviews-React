// src/components/auth/Signup.tsx
import React, { useState } from 'react';
import { Account, Models } from 'appwrite';

interface SignupProps {
  onLoginSuccess: (user: Models.User<Models.Preferences>) => void;
  account: Account;
}

function Signup({ onLoginSuccess, account }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create the user account
      await account.create(
        'unique()', // Generate a unique user ID
        email,
        password,
        name
      );

      // Create a session to log the user in immediately after signup
      await account.createEmailPasswordSession(email, password);

      // Get the current user to pass to onLoginSuccess
      const user = await account.get();

      onLoginSuccess(user); // Notify the parent component of successful signup/login
    } catch (error) {
      console.error('Signup error:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign up</button>
    </form>
  );
}

export { Signup };