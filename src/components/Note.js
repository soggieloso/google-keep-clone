import React from "react";

function Note({ title, text, onDelete }) {
  return (
    <div className="note">
      <div className="title">{title}</div>
      <div className="text">{text}</div>
      <div className="note-footer">
        <span className="material-symbols-outlined">archive</span>
        <span
          className="material-symbols-outlined"
          onClick={onDelete}
          style={{ cursor: "pointer" }}
        >
          delete
        </span>
      </div>
    </div>
  );
}

export default Note;
