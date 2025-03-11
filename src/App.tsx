// src/App.tsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import QuestionCount from "./components/QuestionCount";
import QuestionDisplay from "./components/QuestionDisplay";
import AccountPage from "./components/AccountPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/HeaderFooter.css";
import "./App.css";
import "./style.css";
import { Client, Account, Models } from "appwrite";
import AuthPage from "./components/auth/AuthPage";

// Initialize Appwrite client and account instance globally
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const account = new Account(client);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(5);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const user = await account.get();
        setIsLoggedIn(true);
        setUser(user);
      } catch (error) {
        console.warn("User is not logged in.");
        setIsLoggedIn(false);
      }
    };

    checkUserSession();
  }, []);

  const handleLoginSuccess = (user: Models.User<Models.Preferences>) => {
    setIsLoggedIn(true);
    setUser(user);
    navigate("/questionCount");
  };

  const handleStart = (numQuestions: number) => {
    setSelectedNumQuestions(numQuestions);
    navigate("/questions");
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <AuthPage
                mode={mode}
                toggleMode={toggleMode}
                onLoginSuccess={handleLoginSuccess}
              />
            }
          />
          {isLoggedIn && (
            <>
              <Route path="/questionCount" element={<QuestionCount onStart={handleStart} />} />
              <Route path="/questions" element={<QuestionDisplay numQuestions={selectedNumQuestions} />} />
              <Route path="/account" element={<AccountPage onLogout={handleLogout} user={user} />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
