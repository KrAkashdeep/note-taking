import { useState } from "react";
import AddNote from "./AddNote";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [showAddNote, setShowAddNote] = useState(null);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold my-4 text-center">Note List</h1>

      {/* Add Note Buttons */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-4 bg-gray-100 p-3 rounded-lg">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setShowAddNote("text")}
          >
            Add Text Note
          </button>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            onClick={() => setShowAddNote("audio")}
          >
            Add Audio Note
          </button>
        </div>
      </div>

      {/* Notes Display Area */}
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-500">
                {note.type.toUpperCase()} NOTE
              </span>
              <span className="text-sm text-gray-400">
                {new Date(note.date).toLocaleDateString()}
              </span>
            </div>

            {note.type === "text" ? (
              <p className="text-gray-800 whitespace-pre-wrap">
                {note.content}
              </p>
            ) : (
              <div className="bg-gray-50 p-3 rounded">
                <audio controls className="w-full">
                  <source src={note.content} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        ))}

        {notes.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notes yet. Add your first note!
          </div>
        )}
      </div>

      {/* Add Note Popup */}
      {showAddNote && (
        <AddNote
          type={showAddNote}
          onClose={() => setShowAddNote(null)}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}

export default NoteList;
