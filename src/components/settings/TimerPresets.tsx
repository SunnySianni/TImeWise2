"use client";

import { useState, useEffect } from "react";

const TimerPresets = () => {
  const [timerPresets, setTimerPresets] = useState<{ name: string; duration: number }[]>([]);

  // Load presets from localStorage on mount
  useEffect(() => {
    const savedPresets = JSON.parse(localStorage.getItem("timerPresets") || "[]");
    setTimerPresets(savedPresets);
  }, []);

  // Save presets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timerPresets", JSON.stringify(timerPresets));
  }, [timerPresets]);

  // Function to add a new preset
  const addPreset = () => {
    const name = prompt("Enter preset name:")?.trim();
    const duration = parseInt(prompt("Enter duration (in seconds):") || "0", 10);

    if (!name || isNaN(duration) || duration <= 0) {
      alert("Please enter a valid name and duration (in seconds).");
      return;
    }

    const updatedPresets = [...timerPresets, { name, duration }];
    setTimerPresets(updatedPresets);
  };

  // Function to delete a preset
  const removePreset = (index: number) => {
    const updatedPresets = timerPresets.filter((_, i) => i !== index);
    setTimerPresets(updatedPresets);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h3 className="text-lg font-medium mb-3">Timer Presets</h3>

      {/* Display existing presets */}
      <ul className="mb-3">
        {timerPresets.length > 0 ? (
          timerPresets.map((preset, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded mb-1">
              <span>{preset.name}: {preset.duration} sec</span>
              <button
                onClick={() => removePreset(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No presets added.</p>
        )}
      </ul>

      {/* Button to add a new preset */}
      <button
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={addPreset}
      >
        Add Preset
      </button>
    </div>
  );
};

export default TimerPresets;
