import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTextNote from "./AddTextNote";
import AddAudioNote from "./AddAudioNote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { createNote, getNotes, deleteNote } from "../api";

function NoteList() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await getNotes();

    if (response.success) {
      setNotes(response.tasks);
    }
  };

  const handleAddNote = async (newNote) => {
    const response = await createNote(newNote);

    if (response.success) {
      fetchNotes();
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteNote(id);

    if (response.success) {
      fetchNotes();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Note List</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>
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
        {notes.map((note) => (
          <div
            key={note._id}
            className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <div className="flex justify-between w-full">
                <span className="text-sm font-medium text-gray-500">
                  Added via {note.addBy}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(note.addedTime).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <p className="text-gray-800  text-[22px] whitespace-pre-wrap mt-2">
              {note.description}
            </p>

            <button
              onClick={() => handleDelete(note._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
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
