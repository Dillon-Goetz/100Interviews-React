// App.tsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import QuestionCount from "./components/QuestionCount";
import QuestionDisplay from "./components/QuestionDisplay";
import AccountPage from "./components/AccountPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Client, Account } from "appwrite";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(5);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  // const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  useEffect(() => {
    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT);
    const account = new Account(client);

    account.get()
      .then((user) => {
        setIsLoggedIn(true);
        // setUser(user);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        console.error(error);
      });
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
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
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT);
    const account = new Account(client);

    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {mode === "login" ? (
                <div>
                  <Login onLoginSuccess={handleLoginSuccess} />
                  <p>
                    Don't have an account? <button onClick={toggleMode}>Sign up</button>
                  </p>
                </div>
              ) : (
                <div>
                  <Signup onLoginSuccess={handleLoginSuccess} />
                  <p>
                    Already have an account? <button onClick={toggleMode}>Log in</button>
                  </p>
                </div>
              )}
            </div>
          }
        />
        <Route
          path="/questionCount"
          element={isLoggedIn ? <QuestionCount onStart={handleStart} /> : null}
        />
        <Route
          path="/questions"
          element={isLoggedIn ? <QuestionDisplay numQuestions={selectedNumQuestions} /> : null}
        />
        <Route
          path="/account"
          element={isLoggedIn ? <AccountPage onLogout={handleLogout} /> : null}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;