import { storage } from "../../appwriteConfig"

interface QuestionProps {
  question: {
    questionText: string
    audioID?: string
  }
}

export default function CurrentQuestion({ question }: QuestionProps) {
  return (
    <div className="question">
      {question.audioID ? (
        <div className="audio-container">
          <audio
            controls
            src={storage.getFileView("behavioral", question.audioID)}
            onError={(e) => console.log("audio error", e)}
          ></audio>
        </div>
      ) : (
        <p>No audio available for this question.</p>
      )}
      <div className="question-text">{question.questionText}</div>
      
    </div>
  )
}

