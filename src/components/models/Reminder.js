
class Reminder {
  constructor(noteId, reminderDate, email = null, sent = false) {
    this.noteId = noteId;
    this.reminderDate = reminderDate;
    this.email = email;
    this.sent = sent;
    this.createdAt = new Date();
  }
}

export default Reminder;