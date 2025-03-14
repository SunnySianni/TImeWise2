"use client";

import { useState, useEffect } from "react";

const NotificationSettings = () => {
  // Initial state based on localStorage or default values
  const getStoredValue = <T,>(key: string, defaultValue: T): T => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    };

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    getStoredValue("notificationsEnabled", true)
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    getStoredValue("soundEnabled", true)
  );
  const [timerPresets, setTimerPresets] = useState<{ name: string; duration: number }[]>(
    getStoredValue("timerPresets", [
      { name: "Pomodoro", duration: 1500 },
      { name: "Short Break", duration: 300 },
      { name: "Custom", duration: 1800 },
    ])
  );

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("timerPresets", JSON.stringify(timerPresets));
  }, [timerPresets]);

  // Handle toggle of settings
  const handleNotificationToggle = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleSoundToggle = () => {
    setSoundEnabled((prev) => !prev);
  };

  const addPreset = () => {
    const name = prompt("Enter preset name:");
    const duration = parseInt(prompt("Enter duration (in seconds):") || "0", 10);
    if (name && duration) {
      setTimerPresets((prevPresets) => [...prevPresets, { name, duration }]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Notification & Settings</h2>

      {/* Notification Settings */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="notification-toggle"
          checked={notificationsEnabled}
          onChange={handleNotificationToggle}
          className="mr-2"
        />
        <label htmlFor="notification-toggle">Enable Notifications</label>
      </div>

      {/* Sound Settings */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="sound-toggle"
          checked={soundEnabled}
          onChange={handleSoundToggle}
          className="mr-2"
        />
        <label htmlFor="sound-toggle">Enable Sound</label>
      </div>

      {/* Timer Presets */}
      <div className="mt-4">
        <h3 className="font-medium">Timer Presets</h3>
        <ul>
          {timerPresets.map((preset, index) => (
            <li key={index}>{preset.name}: {preset.duration} sec</li>
          ))}
        </ul>
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={addPreset}
        >
          Add Preset
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
