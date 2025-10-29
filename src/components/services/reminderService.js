import { isReminderDue } from '../utils/dateUtils';
import EmailService from './emailService';

class ReminderService {
  constructor() {
    this.reminderCheckInterval = null;
    this.checkInterval = 60000; 
  }

  startReminderChecking() {
    if (this.reminderCheckInterval) {
      this.stopReminderChecking();
    }

    this.reminderCheckInterval = setInterval(() => {
      this.checkDueReminders();
    }, this.checkInterval);

    console.log('Reminder checking started');
  }

  stopReminderChecking() {
    if (this.reminderCheckInterval) {
      clearInterval(this.reminderCheckInterval);
      this.reminderCheckInterval = null;
      console.log('Reminder checking stopped');
    }
  }

  async checkDueReminders() {
    
    const notes = this.getNotesFromStorage();
    const dueNotes = notes.filter(note => 
      note.reminder && 
      !note.reminder.sent && 
      isReminderDue(note.reminder.date)
    );

    for (const note of dueNotes) {
      await this.handleDueReminder(note);
    }
  }

  async handleDueReminder(note) {
    try {
     
      if (note.reminder.email) {
        await EmailService.sendReminderEmail(note.reminder.email, note);
      }

   
      this.markReminderAsSent(note.id);
      
  
      this.showBrowserNotification(note);
      
    } catch (error) {
      console.error('Error handling due reminder:', error);
    }
  }

  showBrowserNotification(note) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Google Keep Reminder', {
        body: `${note.title}\n${note.text}`,
        icon: 'https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png'
      });
    }
  }

  getNotesFromStorage() {
    
    try {
      return JSON.parse(localStorage.getItem('keep-notes') || '[]');
    } catch {
      return [];
    }
  }

  markReminderAsSent(noteId) {
    const notes = this.getNotesFromStorage();
    const updatedNotes = notes.map(note => {
      if (note.id === noteId && note.reminder) {
        return {
          ...note,
          reminder: { ...note.reminder, sent: true }
        };
      }
      return note;
    });
    
    localStorage.setItem('keep-notes', JSON.stringify(updatedNotes));
  }
}

const reminderService = new ReminderService();
export default reminderService;