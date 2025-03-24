import { useState, useEffect } from 'react';
import { useAchievements } from '../context/AchievementsContext'; // Import the achievements context

// Define a custom hook for timer functionality
export const useTimer = (initialMinutes: number = 25) => {
  const { updateProgress } = useAchievements(); // Get updateProgress from AchievementsContext
  const [isActive, setIsActive] = useState(false); // Timer active state
  const [minutes, setMinutes] = useState(initialMinutes); // Minutes remaining
  const [seconds, setSeconds] = useState(0); // Seconds remaining
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Store interval ID

  // Track sessions and total focus time
  const [sessionCount, setSessionCount] = useState(0); // Number of completed sessions
  const [focusTime, setFocusTime] = useState(0); // Total focus time in minutes

  useEffect(() => {
    // If the timer is active, start the countdown
    if (isActive) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(id); // Stop the countdown when the time is up
              setIsActive(false);
              setSessionCount((prevCount) => prevCount + 1); // Increment session count when timer ends
              setFocusTime((prevFocusTime) => prevFocusTime + initialMinutes); // Add focus time
              updateProgress('first_session_complete', sessionCount + 1); // Unlock achievement after first session
              updateProgress('five_sessions_complete', sessionCount + 1); // Check for five sessions achievement
              updateProgress('ten_sessions_complete', sessionCount + 1); // Check for ten sessions achievement
              updateProgress('power_user', sessionCount + 1); // Check for power user achievement
              return 0;
            }
            setMinutes((prevMinutes) => prevMinutes - 1); // Decrement minutes
            return 59; // Reset seconds to 59
          }
          return prevSeconds - 1; // Decrement seconds
        });
      }, 1000); // 1 second interval
      setIntervalId(id); // Store interval ID

      // Cleanup interval on unmount or when inactive
      return () => {
        if (id) clearInterval(id);
      };
    } else {
      // Stop the interval when the timer is inactive
      if (intervalId) clearInterval(intervalId);
    }
  }, [isActive, minutes, intervalId, sessionCount, initialMinutes, updateProgress]); // Add sessionCount, updateProgress

  const startTimer = () => setIsActive(true); // Start the timer
  const stopTimer = () => setIsActive(false); // Stop the timer
  const resetTimer = () => {
    setMinutes(initialMinutes); // Reset to the initial minutes
    setSeconds(0); // Reset seconds
    setIsActive(false); // Stop the timer
  };

  return {
    minutes,
    seconds,
    isActive,
    sessionCount,
    focusTime,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
