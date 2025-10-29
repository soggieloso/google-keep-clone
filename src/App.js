import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";


let reminderService = null;
try {
  
  reminderService = require("./services/reminderService").default;
} catch (error) {
  console.warn("Reminder service not available, using mock service");
  
  reminderService = {
    startReminderChecking: () => console.log("Reminder service: started (mock)"),
    stopReminderChecking: () => console.log("Reminder service: stopped (mock)")
  };
}

function App() {
  const [notes, setNotes] = useState([]);

 
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('keep-notes') || '[]');
    setNotes(savedNotes);
    

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
  
    if (reminderService) {
      reminderService.startReminderChecking();
    }
    
    // Cleanup on unmount
    return () => {
      if (reminderService) {
        reminderService.stopReminderChecking();
      }
    };
  }, []);

  
  useEffect(() => {
    localStorage.setItem('keep-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    const noteWithId = {
      id: Date.now(),
      ...newNote,
    };
    
    setNotes((prevNotes) => [...prevNotes, noteWithId]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNoteReminder = (noteId, reminder) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, reminder } 
          : note
      )
    );
  };

  return (
    <>
      <Navbar />
      <main>
        <Sidebar />
        <div className="content">
          <NoteForm onAddNote={addNote} />
          <NotesList 
            notes={notes} 
            onDeleteNote={deleteNote}
            onUpdateNoteReminder={updateNoteReminder}
          />
        </div>
      </main>
    </>
  );
}

export default App;