// RecordingControls.tsx
import React from "react";

interface RecordingControlsProps {
  isRecording: boolean;
  audioURL: string;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({ isRecording, audioURL, startRecording, stopRecording }) => {
  return (
    <div className="recording-controls">
      <button onClick={isRecording ? stopRecording : startRecording} className="record-button">
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioURL && <audio src={audioURL} controls className="recorded-audio" />}
    </div>
  );
};

export default RecordingControls;