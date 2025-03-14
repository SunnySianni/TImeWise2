
import { useState, useEffect } from 'react';

// Define a custom hook for timer functionality
export const useTimer = (initialMinutes: number = 25) => {
  const [isActive, setIsActive] = useState(false); // Timer active state
  const [minutes, setMinutes] = useState(initialMinutes); // Minutes remaining
  const [seconds, setSeconds] = useState(0); // Seconds remaining
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Store interval ID

  useEffect(() => {
    // If the timer is active, start the countdown
    if (isActive) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(id); // Stop the countdown when the time is up
              setIsActive(false);
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
  }, [isActive, minutes, intervalId]); // Add intervalId to dependency array

  const startTimer = () => setIsActive(true); // Start the timer
  const stopTimer = () => setIsActive(false); // Stop the timer
  const resetTimer = () => {
    setMinutes(initialMinutes); // Reset to the initial minutes
    setSeconds(0); // Reset seconds
    setIsActive(false); // Stop the timer
  };

  return { minutes, seconds, isActive, startTimer, stopTimer, resetTimer };
};
