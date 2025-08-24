// Helper functions for common notification types
// These functions should be used within components that have access to the useNotifications hook

export const showSuccessNotification = (addNotification, title, message) => {
  addNotification({
    type: 'success',
    title,
    message,
  });
};

export const showErrorNotification = (addNotification, title, message) => {
  addNotification({
    type: 'error',
    title,
    message,
  });
};

export const showWarningNotification = (addNotification, title, message) => {
  addNotification({
    type: 'warning',
    title,
    message,
  });
};

export const showInfoNotification = (addNotification, title, message) => {
  addNotification({
    type: 'info',
    title,
    message,
  });
};

// Common notification messages
export const NOTIFICATION_MESSAGES = {
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_DELETED: 'Task deleted successfully!',
  COURSE_ENROLLED: 'Successfully enrolled in course!',
  COURSE_COMPLETED: 'Course completed! Congratulations!',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGIN_ERROR: 'Invalid credentials. Please try again.',
  SIGNUP_SUCCESS: 'Account created successfully!',
  SIGNUP_ERROR: 'Failed to create account. Please try again.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SAVE_SUCCESS: 'Changes saved successfully!',
  SAVE_ERROR: 'Failed to save changes. Please try again.',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this item?',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};
