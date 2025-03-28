'use client';

import { useState, useEffect } from "react";
import { useSettings } from "../../context/SettingsContext"; // Update the path to the correct file location

const Settings = () => {
  const { settings, updateSettings } = useSettings(); // Access settings from context
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNotificationToggle = () => {
    updateSettings({ notifications: !settings.notifications }); // Update notifications setting in context
  };

  const handleSoundToggle = () => {
    updateSettings({ sound: !settings.sound }); // Update sound setting in context
  };

  const handleWeeklyFocusGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGoal = parseInt(e.target.value, 10);
    if (newGoal >= 0) {
      updateSettings({ weeklyFocusGoal: newGoal }); // Update the weekly focus goal in context
    }
  };

  const addPreset = () => {
    const name = prompt("Enter preset name:");
    const duration = parseInt(prompt("Enter duration (in seconds):") || "0", 10);
    if (name && duration > 0) {
      updateSettings({
        timerPresets: [
          ...settings.timerPresets,
          { name, duration },
        ],
      }); // Add a new preset to the timerPresets in context
    } else {
      alert("Please enter valid preset data.");
    }
  };

  const editPreset = (index: number) => {
    const name = prompt("Enter new preset name:", settings.timerPresets[index].name);
    const duration = parseInt(prompt("Enter new duration (in seconds):", settings.timerPresets[index].duration.toString()) || "0", 10);
    if (name && duration > 0) {
      const updatedPresets = [...settings.timerPresets];
      updatedPresets[index] = { name, duration };
      updateSettings({ timerPresets: updatedPresets }); // Update the specific preset in context
    } else {
      alert("Please enter valid preset data.");
    }
  };

  const deletePreset = (index: number) => {
    updateSettings({
      timerPresets: settings.timerPresets.filter((_, i) => i !== index),
    }); // Remove a preset from the timerPresets in context
  };

  if (!isClient) return null;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-base font-semibold mb-3">Settings</h2>

      {/* Weekly Focus Goal */}
      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm mb-2">
        <label htmlFor="weeklyFocusGoal" className="text-xs">Weekly Focus Goal (minutes)</label>
        <input
          type="number"
          id="weeklyFocusGoal"
          value={settings.weeklyFocusGoal || 0}
          onChange={handleWeeklyFocusGoalChange}
          className="w-12 p-2 text-black rounded-md"
          min="0"
        />
      </div>

      {/* Notifications Toggle */}
      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm mb-2">
        <label htmlFor="notification-toggle" className="text-xs">Enable Notifications</label>
        <input
          type="checkbox"
          id="notification-toggle"
          checked={settings.notifications}
          onChange={handleNotificationToggle}
          className="w-4 h-4"
        />
      </div>

      {/* Sound Toggle */}
      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm mb-2">
        <label htmlFor="sound-toggle" className="text-xs">Enable Sound</label>
        <input
          type="checkbox"
          id="sound-toggle"
          checked={settings.sound}
          onChange={handleSoundToggle}
          className="w-4 h-4"
        />
      </div>

      {/* Timer Presets */}
      <div className="mt-3">
        <h3 className="text-sm font-medium mb-2">Timer Presets</h3>
        <ul className="bg-white p-2 rounded-lg shadow-sm">
          {settings.timerPresets.map((preset, index) => (
            <li key={index} className="flex justify-between items-center p-2 border-b last:border-none">
              <span className="text-gray-700 text-xs">{preset.name}: {preset.duration} sec</span>
              <div className="flex gap-1">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => editPreset(index)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition"
                  onClick={() => deletePreset(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="mt-2 w-full py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition"
          onClick={addPreset}
        >
          Add Preset
        </button>
      </div>
    </div>
  );
};

export default Settings;
