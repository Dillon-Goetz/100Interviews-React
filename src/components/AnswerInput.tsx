import React from 'react'

interface AnswerInputProps {
    textAnswer: string
    setTextAnswer: (answer: string) => void
  }
  
  export default function AnswerInput({ textAnswer, setTextAnswer }: AnswerInputProps) {
    return (
      <textarea
        placeholder="Type your answer here..."
        value={textAnswer}
        onChange={(e) => setTextAnswer(e.target.value)}
        rows={5}
        className="answer-textarea"
      />
    )
  }
  
  