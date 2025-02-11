import { useState } from "react";
import AddTextNote from "./AddTextNote";
import AddAudioNote from "./AddAudioNote";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">Note List</h1>

      <div className="flex justify-center mb-8">
        <div className="flex gap-4 bg-gray-100 p-3 rounded-lg">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setShowTextModal(true)}
          >
            Add Text Note
          </button>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            onClick={() => setShowAudioModal(true)}
          >
            Add Audio Note
          </button>
        </div>
      </div>

      <div className="space-y-4">
     
        {notes.map((note, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Added via {note.type.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(note.date).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap mt-2">
              {note.content}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notes yet. Add your first note!
          </div>
        )}
      </div>

      {showTextModal && (
        <AddTextNote
          onClose={() => setShowTextModal(false)}
          onAddNote={handleAddNote}
        />
      )}

      {showAudioModal && (
        <AddAudioNote
          onClose={() => setShowAudioModal(false)}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}

export default NoteList;
