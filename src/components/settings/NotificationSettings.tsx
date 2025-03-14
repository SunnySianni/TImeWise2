"use client"; // Mark the component as client-side

import { useState, useEffect } from "react";

const NotificationSettings = () => {
  // State to track whether notifications are enabled
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

  // Load initial notification preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem("notificationsEnabled") === "true";
    setNotificationsEnabled(savedPreference);
  }, []);

  // Handle toggling notification setting
  const handleToggle = () => {
    setNotificationsEnabled((prevState) => {
      const newState = !prevState;
      localStorage.setItem("notificationsEnabled", newState.toString()); // Save preference to localStorage
      return newState;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Notification Settings</h2>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="notification-toggle"
          checked={notificationsEnabled}
          onChange={handleToggle}
          className="mr-2"
        />
        <label htmlFor="notification-toggle">Enable Notifications</label>
      </div>
    </div>
  );
};

export default NotificationSettings;
