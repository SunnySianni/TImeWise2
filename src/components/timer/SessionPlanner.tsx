import { useState, useEffect } from 'react';

const SessionPlanner = () => {
  const [focusDuration, setFocusDuration] = useState<number>(25 * 60); // Default to 25 minutes (in seconds)
  const [breakDuration, setBreakDuration] = useState<number>(5 * 60); // Default to 5 minutes (in seconds)
  const [goal, setGoal] = useState<string>('');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [timerPresets, setTimerPresets] = useState<{ name: string; duration: number }[]>([
    { name: "Pomodoro", duration: 1500 },  // 25 minutes in seconds
    { name: "Short Break", duration: 300 }, // 5 minutes in seconds
    { name: "Custom", duration: 1800 },    // 30 minutes in seconds
  ]);

  useEffect(() => {
    const notificationsSetting = localStorage.getItem('notificationsEnabled');
    const soundSetting = localStorage.getItem('soundEnabled');
    setNotificationsEnabled(notificationsSetting === 'true');
    setSoundEnabled(soundSetting === 'true');
  }, []);

  const handlePresetSelect = (preset: { name: string; duration: number }) => {
    setFocusDuration(preset.duration); // Set focus duration based on preset
    if (notificationsEnabled) {
      alert(`${preset.name} selected!`); // Alert user when a preset is selected
    }
    if (soundEnabled) {
      const audio = new Audio('/path/to/preset-sound.mp3'); // Optional sound when preset is selected
      audio.play();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notificationsEnabled) {
      alert("Session plan saved!");
    }
    if (soundEnabled) {
      console.log("Sound enabled, play a sound or notify the user.");
    }
    console.log(`Session plan saved: Focus Duration - ${focusDuration} sec, Break Duration - ${breakDuration} sec, Goal - ${goal}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Session Planner</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="focus-duration" className="text-lg">Focus Duration (minutes)</label>
          <input
            type="number"
            id="focus-duration"
            value={Math.floor(focusDuration / 60)} // Convert to minutes for display
            onChange={(e) => setFocusDuration(Number(e.target.value) * 60)}
            min="1"
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="break-duration" className="text-lg">Break Duration (minutes)</label>
          <input
            type="number"
            id="break-duration"
            value={Math.floor(breakDuration / 60)} // Convert to minutes for display
            onChange={(e) => setBreakDuration(Number(e.target.value) * 60)}
            min="1"
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="goal" className="text-lg">Session Goal</label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Save Plan
        </button>
      </form>

      <h3 className="mt-4">Choose a Timer Preset</h3>
      <div>
        {timerPresets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePresetSelect(preset)}
            className="mt-2 p-2 bg-blue-500 text-white rounded mr-2"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SessionPlanner;
