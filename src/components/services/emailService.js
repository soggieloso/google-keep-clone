
class EmailService {
  static async sendReminderEmail(email, note) {
    try {
      console.log(`Sending reminder email to: ${email}`);
      console.log(`Note Title: ${note.title}`);
      console.log(`Note Content: ${note.text}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
     
      
      console.log('Reminder email sent successfully!');
      return { success: true };
    } catch (error) {
      console.error('Failed to send reminder email:', error);
      return { success: false, error: error.message };
    }
  }
}

export default EmailService;