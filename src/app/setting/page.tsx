import { useState, useEffect } from 'react';

const Settings = () => {
  // State to check if we are on the client
  const [isClient, setIsClient] = useState(false);

  // State to hold settings
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [timerPresets, setTimerPresets] = useState<{ name: string; duration: number }[]>([
    { name: "Pomodoro", duration: 1500 },
    { name: "Short Break", duration: 300 },
    { name: "Custom", duration: 1800 },
  ]);

  // Initialize settings from localStorage once the component is mounted
  useEffect(() => {
    setIsClient(true); // Mark as client-side

    // Load from localStorage if available
    const storedNotificationsEnabled = localStorage.getItem('notificationsEnabled');
    const storedSoundEnabled = localStorage.getItem('soundEnabled');
    const storedTimerPresets = localStorage.getItem('timerPresets');

    if (storedNotificationsEnabled) {
      setNotificationsEnabled(JSON.parse(storedNotificationsEnabled));
    }
    if (storedSoundEnabled) {
      setSoundEnabled(JSON.parse(storedSoundEnabled));
    }
    if (storedTimerPresets) {
      setTimerPresets(JSON.parse(storedTimerPresets));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
      localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
      localStorage.setItem('timerPresets', JSON.stringify(timerPresets));
    }
  }, [notificationsEnabled, soundEnabled, timerPresets, isClient]);

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

    if (name && duration > 0) {
      setTimerPresets((prevPresets) => [...prevPresets, { name, duration }]);
    } else {
      alert("Please enter valid preset data.");
    }
  };

  // Render nothing on SSR until after the first client render
  if (!isClient) {
    return null;
  }

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

export default Settings;
