'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Session type with 'completed' property
interface Session {
  type: 'focus' | 'break';
  duration: number;
  completed: boolean;
  timestamp: string;
}

// Context type
interface TimerContextType {
  duration: number;
  isRunning: boolean;
  completedSessions: number;
  weeklyFocusTime: number;
  sessionHistory: Session[];
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  completeSession: (session?: Session) => void; // ✅ Accept optional argument
  setDuration: (newDuration: number) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error('useTimer must be used within TimerProvider');
  return context;
};

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [duration, setDuration] = useState(25 * 60); // Default to 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [weeklyFocusTime, setWeeklyFocusTime] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<Session[]>([]);

  // Load saved state from localStorage
  useEffect(() => {
    const savedDuration = localStorage.getItem('duration');
    const savedWeeklyTime = localStorage.getItem('weeklyFocusTime');
    const savedSessions = localStorage.getItem('completedSessions');
    const savedHistory = localStorage.getItem('sessionHistory');

    if (savedDuration) setDuration(Number(savedDuration));
    if (savedWeeklyTime) setWeeklyFocusTime(Number(savedWeeklyTime));
    if (savedSessions) setCompletedSessions(Number(savedSessions));
    if (savedHistory) {
      try {
        setSessionHistory(JSON.parse(savedHistory));
      } catch {
        setSessionHistory([]);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('duration', duration.toString());
    localStorage.setItem('weeklyFocusTime', weeklyFocusTime.toString());
    localStorage.setItem('completedSessions', completedSessions.toString());
    localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
  }, [duration, weeklyFocusTime, completedSessions, sessionHistory]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setDuration(25 * 60); // Reset duration to 25 minutes
  };

  // ✅ Updated to accept optional session override
  const completeSession = (session?: Session) => {
    const minutes = Math.floor(duration / 60);

    const newSession: Session = session ?? {
      type: 'focus',
      duration: minutes,
      completed: true,
      timestamp: new Date().toLocaleString(),
    };

    setSessionHistory((prev) => [...prev, newSession]);
    setCompletedSessions((prev) => prev + 1);
    setWeeklyFocusTime((prev) => prev + newSession.duration);
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        duration,
        isRunning,
        completedSessions,
        weeklyFocusTime,
        sessionHistory,
        startTimer,
        stopTimer,
        resetTimer,
        completeSession,
        setDuration,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
