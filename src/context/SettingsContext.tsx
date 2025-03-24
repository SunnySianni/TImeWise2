import { createContext, useContext, useState, useEffect } from "react";

// Define settings structure
interface Settings {
  theme: string;
  notifications: boolean;
  sound: boolean;
  timerPresets: { name: string; duration: number }[];
}

// Default settings
const defaultSettings: Settings = {
  theme: "light",
  notifications: true,
  sound: true,
  timerPresets: [
    { name: "Pomodoro", duration: 1500 },
    { name: "Short Break", duration: 300 },
    { name: "Custom", duration: 1800 },
  ],
};

// Context creation
const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}>({
  settings: defaultSettings,
  updateSettings: () => {},
});

// Provider component
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Ensure localStorage is only accessed client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage when they change
    if (typeof window !== "undefined") {
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for using settings
export const useSettings = () => useContext(SettingsContext);
