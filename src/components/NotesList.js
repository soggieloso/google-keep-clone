import React from "react";
import Note from "./Note";

function NotesList({ notes, onDeleteNote }) {
  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          text={note.text}
          onDelete={() => onDeleteNote(note.id)}
        />
      ))}
    </div>
  );
}

export default NotesList;
