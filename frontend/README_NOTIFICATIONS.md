# Notifications System

A simple and elegant notifications system for the StudyCare frontend application.

## Features

- **4 Notification Types**: Success, Error, Warning, and Info
- **Auto-dismiss**: Notifications automatically disappear after 5 seconds
- **Manual dismiss**: Users can manually close notifications
- **Notification counter**: Bell icon shows the number of active notifications
- **Responsive design**: Works on both desktop and mobile
- **Easy integration**: Simple hook-based API

## Components

### 1. NotificationContext (`src/contexts/NotificationContext.jsx`)
Provides the notifications state and functions to the entire application.

### 2. Notification (`src/components/Notification.jsx`)
Individual notification component with different styles for each type.

### 3. NotificationsContainer (`src/components/NotificationsContainer.jsx`)
Container that displays all active notifications in the top-right corner.

## Usage

### Basic Usage

```jsx
import { useNotifications } from '../contexts/NotificationContext';

function MyComponent() {
  const { addNotification } = useNotifications();

  const handleSuccess = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully.'
    });
  };

  return (
    <button onClick={handleSuccess}>
      Show Success Notification
    </button>
  );
}
```

### Using Helper Functions

```jsx
import { useNotifications } from '../contexts/NotificationContext';
import { showSuccessNotification, showErrorNotification } from '../utils/notifications';

function MyComponent() {
  const { addNotification } = useNotifications();

  const handleSuccess = () => {
    showSuccessNotification(addNotification, 'Success!', 'Operation completed successfully.');
  };

  const handleError = () => {
    showErrorNotification(addNotification, 'Error!', 'Something went wrong.');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </div>
  );
}
```

### Notification Types

```jsx
// Success notification
addNotification({
  type: 'success',
  title: 'Task Completed',
  message: 'Your task has been marked as complete.'
});

// Error notification
addNotification({
  type: 'error',
  title: 'Login Failed',
  message: 'Invalid email or password.'
});

// Warning notification
addNotification({
  type: 'warning',
  title: 'Low Battery',
  message: 'Your device battery is running low.'
});

// Info notification
addNotification({
  type: 'info',
  title: 'New Message',
  message: 'You have received a new message.'
});
```

## API Reference

### useNotifications Hook

Returns an object with the following properties:

- `notifications`: Array of active notifications
- `addNotification(notification)`: Function to add a new notification
- `removeNotification(id)`: Function to remove a specific notification
- `clearAllNotifications()`: Function to clear all notifications

### addNotification Parameters

```jsx
addNotification({
  type: 'success' | 'error' | 'warning' | 'info', // Required
  title: 'string',                                 // Optional
  message: 'string',                               // Optional
  // timestamp is automatically added
  // id is automatically generated
});
```

## Styling

Notifications use Tailwind CSS classes and automatically adapt their colors based on the type:

- **Success**: Green theme
- **Error**: Red theme  
- **Warning**: Yellow theme
- **Info**: Blue theme

## Demo Page

Visit `/notifications-demo` to see all notification types in action. This page is protected and requires authentication.

## Integration Examples

### Login Success
```jsx
const handleLogin = async (credentials) => {
  try {
    const response = await loginUser(credentials);
    showSuccessNotification(addNotification, 'Welcome Back!', 'Successfully logged in.');
    // Redirect or update state
  } catch (error) {
    showErrorNotification(addNotification, 'Login Failed', error.message);
  }
};
```

### Task Creation
```jsx
const handleCreateTask = async (taskData) => {
  try {
    await createTask(taskData);
    showSuccessNotification(addNotification, 'Task Created', 'New task has been added successfully.');
    // Refresh task list
  } catch (error) {
    showErrorNotification(addNotification, 'Creation Failed', 'Unable to create task. Please try again.');
  }
};
```

### Form Validation
```jsx
const handleSubmit = (formData) => {
  if (!formData.title) {
    showWarningNotification(addNotification, 'Missing Information', 'Please provide a title for the task.');
    return;
  }
  // Continue with submission
};
```

## Best Practices

1. **Keep messages concise**: Notifications should be brief and to the point
2. **Use appropriate types**: Match the notification type to the message content
3. **Don't overuse**: Only show notifications for important events
4. **Provide context**: Include relevant information in the message
5. **Handle errors gracefully**: Always show error notifications when operations fail

## Customization

To customize the notification system:

1. **Change auto-dismiss time**: Modify the timeout in `NotificationContext.jsx`
2. **Adjust positioning**: Update the CSS classes in `NotificationsContainer.jsx`
3. **Modify colors**: Update the color functions in `Notification.jsx`
4. **Add new types**: Extend the switch statements in `Notification.jsx`

## Browser Support

The notifications system works in all modern browsers that support:
- React 18+
- CSS Grid and Flexbox
- ES6+ features
