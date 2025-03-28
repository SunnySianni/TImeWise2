import { createContext, useContext, useState, useEffect } from "react";

// Define settings structure
interface Settings {
  theme: string;
  notifications: boolean;
  sound: boolean;
  timerPresets: { name: string; duration: number }[];
  weeklyFocusGoal: number; // Weekly focus goal in minutes
  weeklyFocusTime: number; // Weekly focus time in minutes
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
  weeklyFocusGoal: 600, // Default weekly goal: 10 hours in minutes
  weeklyFocusTime: 0, // Default: 0 minutes of focus time
};

// Context creation
interface SettingsContextProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  updateWeeklyFocusTime: (newFocusTime: number) => void;
  weeklyFocusGoal: number;  // Add weeklyFocusGoal explicitly here
}

const SettingsContext = createContext<SettingsContextProps>({
  settings: defaultSettings,
  updateSettings: () => {},
  updateWeeklyFocusTime: () => {},
  weeklyFocusGoal: defaultSettings.weeklyFocusGoal, // Ensure it's included here
});

// Provider component
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }, [settings, isClient]);

  // Function to update the general settings
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Function to update weekly focus time
  const updateWeeklyFocusTime = (newFocusTime: number) => {
    setSettings((prev) => {
      const updatedSettings = { ...prev, weeklyFocusTime: newFocusTime };
      localStorage.setItem("settings", JSON.stringify(updatedSettings)); // Store updated settings in localStorage
      return updatedSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      updateWeeklyFocusTime,
      weeklyFocusGoal: settings.weeklyFocusGoal // Ensure weeklyFocusGoal is passed in the provider
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for using settings
export const useSettings = () => useContext(SettingsContext);
