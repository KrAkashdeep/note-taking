// import { useState, useEffect, useRef } from "react";

// const AddNote = ({ type, onClose, onAddNote }) => {
//   const [content, setContent] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState("");
//   const mediaRecorder = useRef(null);
//   const audioChunks = useRef([]);

//   useEffect(() => {
//     return () => {
//       if (audioUrl) {
//         URL.revokeObjectURL(audioUrl);
//       }
//     };
//   }, [audioUrl]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder.current = new MediaRecorder(stream);

//       mediaRecorder.current.ondataavailable = (e) => {
//         audioChunks.current.push(e.data);
//       };

//       mediaRecorder.current.onstop = () => {
//         const blob = new Blob(audioChunks.current, { type: "audio/mpeg" });
//         const url = URL.createObjectURL(blob);
//         setAudioUrl(url);
//         setContent(url);
//         audioChunks.current = [];
//         stream.getTracks().forEach((track) => track.stop());
//       };

//       mediaRecorder.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       console.error("Error accessing microphone:", err);
//       alert("Microphone access is required for audio notes");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current) {
//       mediaRecorder.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if ((type === "text" && content.trim()) || (type === "audio" && audioUrl)) {
//       onAddNote({
//         type,
//         content,
//         date: new Date().toISOString(),
//       });
//       setContent("");
//       setAudioUrl("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4">
//       <div className="bg-zinc-50 border-2 rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">
//             Add {type.charAt(0).toUpperCase() + type.slice(1)} Note
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {type === "text" ? (
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows="4"
//               placeholder="Enter your note..."
//               autoFocus
//             />
//           ) : (
//             <div className="mb-4 space-y-4">
//               <div className="flex flex-col items-center gap-4">
//                 <button
//                   type="button"
//                   onClick={isRecording ? stopRecording : startRecording}
//                   className={`px-6 py-3 rounded-full text-white ${
//                     isRecording
//                       ? "bg-red-500 hover:bg-red-600"
//                       : "bg-blue-500 hover:bg-blue-600"
//                   } transition-colors`}
//                 >
//                   {isRecording ? "Stop Recording" : "Start Recording"}
//                 </button>

//                 {audioUrl && (
//                   <div className="w-full">
//                     <audio controls className="w-full">
//                       <source src={audioUrl} type="audio/mpeg" />
//                       Your browser does not support the audio element.
//                     </audio>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//               disabled={
//                 (type === "text" && !content.trim()) ||
//                 (type === "audio" && !audioUrl)
//               }
//             >
//               Add Note
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddNote;

import { useState, useEffect, useRef } from "react";

const AddNote = ({ type, onClose, onAddNote }) => {
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const recognition = useRef(null);
  const finalTranscript = useRef("");

  useEffect(() => {
    if (type === "audio") {
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
    }
  }, [type]);

  const startRecording = () => {
    if (recognition.current) {
      finalTranscript.current = "";
      setContent("");
      recognition.current.start();
      setIsRecording(true);
      setIsEditing(false);
    }
  };

  const stopRecording = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsRecording(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    // Remove any trailing space from final transcript
    finalTranscript.current = content.trim() + " ";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddNote({
        type: "text",
        content: content.trim(),
        date: new Date().toISOString(),
      });
      setContent("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-50 border-2 rounded-lg p-6 w-full max-w-md">
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
                {!isRecording && content && (
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
                      : "bg-blue-500 hover:bg-blue-600"
                  } transition-colors`}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </button>

                <div className="w-full min-h-[120px] p-3 border rounded-lg bg-white">
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
                    onClick={handleSaveEdit}
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
                Add as Text Note
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddNote;
