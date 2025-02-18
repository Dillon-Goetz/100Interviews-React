"use client"
import React, { useState, useRef } from 'react';

interface AudioRecorderProps {
    setAudioURL: (url: string) => void;
    audioURL: string;
}

export default function AudioRecorder({ setAudioURL, audioURL }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm;codecs=opus'}); //Added mimeType here
            mediaRecorderRef.current = mediaRecorder;
            const audioChunks: Blob[] = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                console.log("Audio chunks:", audioChunks);
                const audioBlob = new Blob(audioChunks, { type: "audio/webm;codecs=opus" });
                console.log("Audio blob:", audioBlob);
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioURL(audioUrl);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="recording-controls">
            <button onClick={isRecording ? stopRecording : startRecording} className="record-button">
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {audioURL && <audio src={audioURL} controls className="recorded-audio" />}
        </div>
    );
}