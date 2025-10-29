
import React, { useState } from "react";
import { formatDateForInput } from "./utils/dateUtils";

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showReminder, setShowReminder] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderEmail, setReminderEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const noteData = {
        title,
        text,
      };

      
      if (showReminder && reminderDate) {
        noteData.reminder = {
          date: reminderDate,
          email: reminderEmail || null,
          sent: false
        };
      }

      onAddNote(noteData);
      setTitle("");
      setText("");
      setShowReminder(false);
      setReminderDate("");
      setReminderEmail("");
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1); 
    return formatDateForInput(now);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="note-title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="note-text"
          placeholder="Take a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        
        {/* Reminder Section */}
        <div className="reminder-section" style={{ margin: '10px 0', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
          <div className="reminder-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showReminder ? '10px' : '0' }}>
            <span style={{ fontSize: '0.9rem', color: '#5f6368' }}>Add Reminder</span>
            <button
              type="button"
              className="small-icon"
              onClick={() => setShowReminder(!showReminder)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5f6368' }}
            >
              <span className="material-symbols-outlined">
                {showReminder ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
          
          {showReminder && (
            <div className="reminder-fields" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="datetime-local"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                min={getMinDateTime()}
                style={{
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
              <input
                type="email"
                placeholder="Email for reminder (optional)"
                value={reminderEmail}
                onChange={(e) => setReminderEmail(e.target.value)}
                style={{
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button className="close-btn" type="submit">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;