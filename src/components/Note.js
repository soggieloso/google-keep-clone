
import React from "react";

function Note({ title, text, reminder, onDelete, onEditReminder }) {
  const formatReminderDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="note">
      <div className="title">{title}</div>
      <div className="text">{text}</div>
      
      {reminder && (
        <div className="reminder-badge" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          margin: '8px 0',
          padding: '4px 8px',
          backgroundColor: reminder.sent ? '#e8f0fe' : '#fce8e6',
          borderRadius: '12px',
          fontSize: '0.75rem',
          color: '#5f6368'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            notifications
          </span>
          <span>
            {formatReminderDate(reminder.date)}
            {reminder.sent && ' (Sent)'}
          </span>
        </div>
      )}
      
      <div className="note-footer">
        {reminder && (
          <span 
            className="material-symbols-outlined"
            onClick={() => onEditReminder && onEditReminder()}
            style={{ cursor: 'pointer' }}
            title="Edit reminder"
          >
            edit
          </span>
        )}
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
