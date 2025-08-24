import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import Notification from './Notification';

const NotificationsContainer = () => {
  const { notifications, removeNotification, clearAllNotifications } = useNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {notifications.length > 1 && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 font-medium">
            {notifications.length} notifications
          </span>
          <button
            onClick={clearAllNotifications}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        </div>
      )}
      
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationsContainer;
