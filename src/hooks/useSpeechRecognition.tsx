import React, { useState } from 'react';

const VoiceToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);

    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        setIsListening(true);
    };

    recognition.onresult = (event) => {
        const results = event.results;
        const transcript = Array.from(results)
            .map((result) => result[0].transcript)
            .join('');
        setTranscript(transcript);
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    recognition.onspeechend = () => {
        recognition.stop();
        setIsListening(false);
    };

    const handleSpeechRecognition = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    return (
        <div>
            <button onClick={handleSpeechRecognition}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <p>{transcript}</p>
        </div>
    );
};

export default VoiceToText;