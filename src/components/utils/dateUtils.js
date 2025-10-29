

export const formatDateForInput = (date) => {
  return date.toISOString().slice(0, 16);
};

export const parseDateFromInput = (dateString) => {
  return new Date(dateString);
};

export const isReminderDue = (reminderDate) => {
  return new Date() >= new Date(reminderDate);
};

export const getTimeUntilReminder = (reminderDate) => {
  const now = new Date();
  const reminder = new Date(reminderDate);
  return reminder - now;
};
