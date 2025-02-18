
interface NavigationControlsProps {
    handlePrevQuestion: () => void
    handleNextQuestion: () => void
    saveAnswer: () => void
    isFirstQuestion: boolean
    isLastQuestion: boolean
  }
  
  export default function NavigationControls({
    handlePrevQuestion,
    handleNextQuestion,
    saveAnswer,
    isFirstQuestion,
    isLastQuestion,
  }: NavigationControlsProps) {
    return (
      <div className="navigation-controls">
        <button onClick={handlePrevQuestion} disabled={isFirstQuestion} className="nav-button">
          Previous
        </button>
        <button onClick={saveAnswer} className="save-button">
          Save Answer
        </button>
        <button onClick={handleNextQuestion} disabled={isLastQuestion} id="next-button" className="nav-button">
          Next Question
        </button>
      </div>
    )
  }
  
  