
import { useState, useEffect } from "react";
import { databases } from "../../appwriteConfig2";
import CurrentQuestion from "./CurrentQuestion";
import AnswerInput from "./AnswerInput";
import AudioRecorder from "./AudioRecorder";
import NavigationControls from "./NavigationControls";
import "../style.css";

interface Question {
  $id: string;
  questionText: string;
  audioID?: string;
}

interface QuestionDisplayProps {
  numQuestions: number;
}

export default function EnhancedQuestionDisplay({ numQuestions }: QuestionDisplayProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [textAnswer, setTextAnswer] = useState("");
  const [audioURL, setAudioURL] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;
        const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_INTERVIEW_QUESTIONS;

        const allQuestionsResponse = await databases.listDocuments(
          databaseId,
          collectionId
        );

        let allQuestions = allQuestionsResponse.documents.map((doc: any) => ({
          $id: doc.$id,
          questionText: doc.questionText,
          audioID: doc.audioID,
        })) as Question[];

        const firstQuestionId = import.meta.env.VITE_FIRST_QUESTION_ID;
        const lastQuestionId = import.meta.env.VITE_LAST_QUESTION_ID;

        const firstQuestion = allQuestions.find((q) => q.$id === firstQuestionId);
        const lastQuestion = allQuestions.find((q) => q.$id === lastQuestionId);

        let remainingQuestions = allQuestions.filter(
          (q) => q.$id !== firstQuestionId && q.$id !== lastQuestionId
        );

        const shuffledRemainingQuestions = remainingQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, numQuestions - (firstQuestion ? 1 : 0) - (lastQuestion ? 1 : 0));

        let finalQuestions: Question[] = [];
        if (firstQuestion) finalQuestions.push(firstQuestion);
        finalQuestions = finalQuestions.concat(shuffledRemainingQuestions);
        if (lastQuestion) finalQuestions.push(lastQuestion);

        setQuestions(finalQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [numQuestions]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTextAnswer("");
      setAudioURL("");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setTextAnswer("");
      setAudioURL("");
    }
  };

  const saveAnswer = () => {
    console.log("Saving answer for question:", questions[currentQuestionIndex].$id);
    console.log("Text answer:", textAnswer);
    console.log("Audio answer URL:", audioURL);
    alert("Answer saved successfully!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div id="questions-container" className="mock-interview-practice">
      <h1>Mock Interview Practice</h1>
      <CurrentQuestion question={currentQuestion} />
      <AnswerInput textAnswer={textAnswer} setTextAnswer={setTextAnswer} />
      <AudioRecorder setAudioURL={setAudioURL} audioURL={audioURL} />
      <NavigationControls
        handlePrevQuestion={handlePrevQuestion}
        handleNextQuestion={handleNextQuestion}
        saveAnswer={saveAnswer}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    </div>
  );
}