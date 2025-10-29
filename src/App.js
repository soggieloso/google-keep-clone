import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now(),
        ...newNote,
      },
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <>
      <Navbar />
      <main>
        <Sidebar />
        <div className="content">
          <NoteForm onAddNote={addNote} />
          <NotesList notes={notes} onDeleteNote={deleteNote} />
        </div>
      </main>
    </>
  );
}

export default App;
