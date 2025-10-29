import React from "react";
import Note from "./Note";

function NotesList({ notes, onDeleteNote, onUpdateNoteReminder }) {
  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          text={note.text}
          reminder={note.reminder}
          onDelete={() => onDeleteNote(note.id)}
          onEditReminder={() => onUpdateNoteReminder(note.id, /* new reminder data */)}
        />
      ))}
    </div>
  );
}

export default NotesList;