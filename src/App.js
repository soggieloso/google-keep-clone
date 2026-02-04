import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

function App() {
  const [notes, setNotes] = useState([]);
  const reminderServiceRef = useRef(null);

  useEffect(() => {
    const initializeApp = async () => {
      // Load saved notes
      const savedNotes = JSON.parse(localStorage.getItem("keep-notes") || "[]");
      setNotes(savedNotes);

      // Request notification permission
      if ("Notification" in window && Notification.permission === "default") {
        await Notification.requestPermission();
      }

      // Try to initialize reminder service
      try {
        const ReminderService = (await import("./services/reminderService"))
          .default;
        reminderServiceRef.current = new ReminderService();
        reminderServiceRef.current.startReminderChecking();
        console.log("Reminder service started successfully");
      } catch (error) {
        console.warn(
          "Could not load reminder service, using mock:",
          error.message,
        );
        // Create a simple mock
        reminderServiceRef.current = {
          startReminderChecking: () =>
            console.log("Mock: Reminder service started"),
          stopReminderChecking: () =>
            console.log("Mock: Reminder service stopped"),
        };
        reminderServiceRef.current.startReminderChecking();
      }
    };

    initializeApp();

    // Cleanup
    return () => {
      if (reminderServiceRef.current?.stopReminderChecking) {
        reminderServiceRef.current.stopReminderChecking();
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("keep-notes", JSON.stringify(notes));
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
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, reminder } : note,
      ),
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