"use client"
import {useState} from 'react'
import "../styles/QuestionCount.css"
import { Link } from "react-router-dom";

interface QuestionSelectorProps {
  onStart: (numQuestions: number) => void
}

function QuestionCount({ onStart }: QuestionSelectorProps) {
  const [numQuestions, setNumQuestions] = useState(3)

  const handleStart = () => {
    onStart(numQuestions)
  }

  return (
    <div className="question-count-container">
      <h2 className="question-count-title">Welcome to Mock Interview Practice</h2>
      <div className="question-count-form">
        <label htmlFor="num-questions" className="question-count-label">
          How many questions would you like to practice?
        </label>
        <select
          id="num-questions"
          className="question-count-select"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number.parseInt(e.target.value))}
        >
          <option value="3">3 Questions</option>
          <option value="5">5 Questions</option>
          <option value="8">8 Questions</option>
          <option value="10">10 Questions</option>
        </select>
        <div className="button-container"></div>
        <button onClick={handleStart} className="question-count-button">
          Begin Practice
        </button>
      </div>
      <div className="my-account-container">
      <Link to="/account" className="my-account-button">
        My Account
      </Link>
      </div>
    </div>
  )
}

export default QuestionCount

