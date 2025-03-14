import { useSettings } from "@/context/SettingsContext";

const TimerPresets = () => {
  const { settings, updateSettings } = useSettings();

  const addPreset = () => {
    const name = prompt("Enter preset name:");
    const duration = parseInt(prompt("Enter duration (in seconds):") || "0", 10);
    if (name && duration) {
      updateSettings({ timerPresets: [...settings.timerPresets, { name, duration }] });
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-medium">Timer Presets</h3>
      <ul>
        {settings.timerPresets.map((preset, index) => (
          <li key={index}>{preset.name}: {preset.duration} sec</li>
        ))}
      </ul>
      <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={addPreset}>
        Add Preset
      </button>
    </div>
  );
};

export default TimerPresets;
