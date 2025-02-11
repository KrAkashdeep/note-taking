/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

const AddAudioNote = ({ onClose, onAddNote }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const recognition = useRef(null);
  const finalTranscript = useRef("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript.current += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }
        setContent(finalTranscript.current + interimTranscript);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    } else {
      alert("Speech recognition is not supported in this browser.");
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    finalTranscript.current = "";
    setContent("");
    recognition.current.start();
    setIsRecording(true);
    setIsEditing(false);
  };

  const stopRecording = () => {
    recognition.current.stop();
    setIsRecording(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    finalTranscript.current = content + " ";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddNote({
        type: "audio",
        content: content.trim(),
        date: new Date().toISOString(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Note" : "Convert Speech to Text"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 space-y-4">
            {!isEditing ? (
              <div className="flex flex-col items-center gap-4">
                {content && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit Text
                  </button>
                )}

                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`px-6 py-3 rounded-full text-white ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } transition-colors`}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </button>

                <div className="w-full min-h-[120px] p-3 border rounded-lg bg-gray-50">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {content || "Your speech will appear here..."}
                  </p>
                  {isRecording && (
                    <div className="mt-2 text-sm text-gray-500">
                      Listening...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Edit your note..."
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={!content.trim()}
              >
                Add Note
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAudioNote;
