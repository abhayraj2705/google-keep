import { useState, useEffect } from 'react';
import { MdMic, MdStop } from 'react-icons/md';

const VoiceNoteButton = ({ onTranscript }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  useEffect(() => {
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          onTranscript(finalTranscript);
        }
        setInterimTranscript(interimTranscript);
      };

      recognition.onerror = (event) => {
        setError(`Error: ${event.error}`);
        setIsRecording(false);
      };

      setRecognition(recognition);
    } else {
      setError('Voice recognition not supported in this browser');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      setError(null);
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="voice-note-button">
      <button
        type="button"
        className={`icon-button ${isRecording ? 'recording' : ''}`}
        onClick={toggleRecording}
        title={isRecording ? 'Stop recording' : 'Start voice note'}
      >
        {isRecording ? <MdStop size={20} /> : <MdMic size={20} />}
      </button>
      {interimTranscript && (
        <div className="interim-transcript">{interimTranscript}</div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default VoiceNoteButton;