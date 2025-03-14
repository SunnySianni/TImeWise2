import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your global data state
interface DataContextType {
  focusDuration: number; // The focus duration (in minutes)
  breakDuration: number;  // The break duration (in minutes)
  sessionStats: { sessionsCompleted: number; totalFocusTime: number }; // Session statistics
  setFocusDuration: (duration: number) => void; // Function to update focus duration
  setBreakDuration: (duration: number) => void; // Function to update break duration
  incrementSessionsCompleted: () => void; // Function to increment session completed count
  addFocusTime: (time: number) => void; // Function to add time to total focus time
}

// Initialize the context with default values
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component to wrap your app and provide data to other components
export const DataProvider = ({ children }: { children: ReactNode }) => {
  // State to store focus duration, break duration, and session stats
  const [focusDuration, setFocusDuration] = useState<number>(25); // Default to 25 minutes
  const [breakDuration, setBreakDuration] = useState<number>(5); // Default to 5 minutes
  const [sessionStats, setSessionStats] = useState<{ sessionsCompleted: number; totalFocusTime: number }>({
    sessionsCompleted: 0,
    totalFocusTime: 0,
  });

  // Function to update focus duration
  const updateFocusDuration = (duration: number) => {
    setFocusDuration(duration);
  };

  // Function to update break duration
  const updateBreakDuration = (duration: number) => {
    setBreakDuration(duration);
  };

  // Function to increment the sessions completed count
  const incrementSessionsCompleted = () => {
    setSessionStats((prevStats) => ({
      ...prevStats,
      sessionsCompleted: prevStats.sessionsCompleted + 1,
    }));
  };

  // Function to add time to total focus time
  const addFocusTime = (time: number) => {
    setSessionStats((prevStats) => ({
      ...prevStats,
      totalFocusTime: prevStats.totalFocusTime + time,
    }));
  };

  return (
    <DataContext.Provider
      value={{
        focusDuration,
        breakDuration,
        sessionStats,
        setFocusDuration: updateFocusDuration,
        setBreakDuration: updateBreakDuration,
        incrementSessionsCompleted,
        addFocusTime,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to access the data context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
