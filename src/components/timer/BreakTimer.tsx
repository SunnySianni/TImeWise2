import { useState, useEffect } from 'react';

// Component to manage the break timer
const BreakTimer = ({ focusSessionComplete }: { focusSessionComplete: boolean }) => {
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes break default
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true); // Handle sound setting
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true); // Handle notifications setting

  // Load sound and notifications settings from localStorage
  useEffect(() => {
    const soundSetting = localStorage.getItem('soundEnabled');
    const notificationsSetting = localStorage.getItem('notificationsEnabled');
    setSoundEnabled(soundSetting === 'true');
    setNotificationsEnabled(notificationsSetting === 'true');
  }, []);

  // Start or pause the break timer based on focus session completion
  useEffect(() => {
    if (focusSessionComplete) {
      setIsRunning(true); // Start break timer
    } else {
      setIsRunning(false); // Pause the break timer if focus session is not complete
    }
  }, [focusSessionComplete]);

  // Decrement timer and handle events when timer finishes
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            // Check if notifications are enabled
            if (notificationsEnabled) {
              alert("Break complete!"); // Display a notification if enabled
            }
            if (soundEnabled) {
              const audio = new Audio('/sound/arcade_level.mp3'); // Replace with actual sound file path
              audio.play(); // Play sound if enabled
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isRunning, soundEnabled, notificationsEnabled]);

  // Format the time in mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="p-4 mt-4">
      <h3 className="text-lg">Break Time</h3>
      <div className="mt-2 text-xl">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default BreakTimer;
