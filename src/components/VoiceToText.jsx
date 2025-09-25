import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";

const VoiceToText = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });

    const { transcript, browserSupportsSpeechRecognition, listening } = useSpeechRecognition();

    useEffect(() => {
        setIsListening(listening);
        setTextToCopy(transcript);
    }, [listening, transcript]);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleAdd = () => {
        console.log("Text to add:", transcript);
        stopListening();
    };

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Browser Not Supported</h3>
                        <p className="text-gray-600">Your browser doesn't support speech recognition.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0  backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-96 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* Animated Mic Icon */}
                            <div className="relative">
                                <div className={`w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm ${
                                    isListening ? 'animate-pulse' : ''
                                }`}>
                                    <svg 
                                        className={`w-6 h-6 text-white transition-all duration-300 ${
                                            isListening ? 'scale-110' : 'scale-100'
                                        }`} 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                                    </svg>
                                </div>
                                
                                {/* Sound Waves Animation */}
                                {isListening && (
                                    <>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 border-2 border-white border-opacity-30 rounded-full animate-ping"></div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 border-2 border-white border-opacity-20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-white">Voice to Text</h3>
                                <p className={`text-sm font-medium transition-all duration-300 ${
                                    isListening ? 'text-yellow-300 animate-pulse' : 'text-blue-100'
                                }`}>
                                    {isListening ? '🎤 Listening...' : '✅ Ready to listen'}
                                </p>
                            </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                            isListening 
                                ? 'bg-yellow-500 text-white animate-pulse' 
                                : 'bg-white bg-opacity-20 text-white'
                        }`}>
                            {isListening ? 'LIVE' : 'IDLE'}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Text Display */}
                    <div 
                        className="min-h-[120px] max-h-48 border-2 border-dashed border-gray-200 rounded-xl p-4 mb-4 bg-gray-50 overflow-y-auto transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                        onClick={() => setTextToCopy(transcript)}
                    >
                        {transcript ? (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{transcript}</p>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-gray-400 text-center">
                                    <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Start speaking to see text here...
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        {/* Record/Stop Button */}
                        <button
                            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                                isListening
                                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg transform hover:scale-105'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-105'
                            }`}
                            onClick={isListening ? stopListening : startListening}
                        >
                            {isListening ? (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                    </svg>
                                    <span>Stop Recording</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                    <span>Start Recording</span>
                                </>
                            )}
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Copy Button */}
                            <button
                                className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border ${
                                    isCopied
                                        ? 'bg-green-500 text-white border-green-500 shadow-lg transform scale-105'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300 hover:shadow-md'
                                } ${!transcript ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={setCopied}
                                disabled={!transcript}
                            >
                                {isCopied ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>

                            {/* Add Button */}
                            <button
                                className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                    !transcript ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={handleAdd}
                                disabled={!transcript}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Text</span>
                            </button>
                        </div>
                    </div>

                    {/* Recording Indicator */}
                    {isListening && (
                        <div className="mt-4 flex items-center justify-center space-x-2">
                            <div className="flex space-x-1">
                                <div className="w-2 h-6 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-6 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                <div className="w-2 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                <div className="w-2 h-6 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                            <span className="text-sm text-red-500 font-medium">Recording in progress...</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Powered by Speech Recognition</span>
                        <span>{transcript.split(' ').length} words</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceToText;