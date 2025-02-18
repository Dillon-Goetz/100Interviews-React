// AccountPage.tsx
import React, { useState, useEffect } from "react";
import { Client, Databases, Account, Models, ID } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
import '../styles/AccountPage.css';

interface AccountPageProps {
  onLogout: () => Promise<void>;
}

interface Question {
  $id: string;
  questionText: string;
  audioID: string;
  questionType: string;
  answer: string;
  Answered: boolean;
  userId?: string;
}

function AccountPage({ onLogout }: AccountPageProps) {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT);
    const databases = new Databases(client);
    const account = new Account(client);

    account.get().then((user) => {
      setUser(user);

      databases
        .listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE,
          import.meta.env.VITE_APPWRITE_COLLECTION_INTERVIEW_QUESTIONS
        )
        .then((response) => {
          const questions: Question[] = response.documents.map((doc) => ({
            $id: doc.$id,
            questionText: doc.questionText,
            audioID: doc.audioID,
            questionType: doc.questionType,
            answer: doc.answer,
            Answered: doc.Answered,
            userId: doc.userId,
          }));
          setAllQuestions(questions);
          setUserQuestions(questions.filter((doc) => doc.userId === user.$id));
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setError("Failed to fetch questions. Please try again later.");
        });
    }).catch((error) => {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user information. Please try again later.");
    });
  }, []);

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT);
    const databases = new Databases(client);

    try {
      const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;
      const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

      if (!databaseId || !collectionId) {
        console.error("Database or collection ID is undefined.");
        setError("Configuration error. Check environment variables.");
        return;
      }

      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          questionText: newQuestion,
          userId: user?.$id,
          audioID: "",
          questionType: "",
          answer: "",
          Answered: false,
        },
      );

      const newQuestionObj: Question = {
        $id: response.$id,
        questionText: response.questionText,
        audioID: response.audioID,
        questionType: response.questionType,
        answer: response.answer,
        Answered: response.Answered,
        userId: user?.$id,
      };

      setAllQuestions([...allQuestions, newQuestionObj]);
      setUserQuestions([...userQuestions, newQuestionObj]);
      setNewQuestion("");
    } catch (error) {
      console.error("Error creating question:", error);
      setError("Failed to create question. Please try again.");
    }
  };

  const handleGoBack = () => {
    navigate('/questioncount');
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="account-page">
      <h2 className="page-title">Account Dashboard</h2>

      <div className="questions-section">
        <h3>All Questions</h3>
        <ul className="question-list">
          {allQuestions.map((question) => (
            <li key={question.$id} className="question-item">
              {question.questionText}
            </li>
          ))}
        </ul>
      </div>

      <div className="questions-section">
        <h3>Your Questions</h3>
        <ul className="question-list">
          {userQuestions.map((question) => (
            <li key={question.$id} className="question-item">
              {question.questionText}
            </li>
          ))}
        </ul>
      </div>

      <div className="create-question-section">
        <h3>Create New Question</h3>
        <form onSubmit={handleCreateQuestion} className="create-question-form">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter your question"
            className="question-input"
          />
          <button type="submit" className="submit-button">
            Create Question
          </button>
        </form>
      </div>

      <div className="account-actions">
        <button onClick={handleGoBack} className="back-to-home-button">
          Back to Home
        </button>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountPage;