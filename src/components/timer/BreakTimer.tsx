import { useState, useEffect } from 'react';

// Component to manage the break timer
const BreakTimer = ({ focusSessionComplete }: { focusSessionComplete: boolean }) => {
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes break
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Start the break timer when focus session is complete
  useEffect(() => {
    if (focusSessionComplete) {
      setIsRunning(true); // Start break timer
    } else {
      setIsRunning(false); // Pause the break timer if focus session is not complete
    }
  }, [focusSessionComplete]);

  // Decrement the break timer every second
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0; // Stop the timer when it reaches 0
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isRunning]);

  // Format time in mm:ss
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="p-4 mt-4">
      <h3 className="text-lg">Break Time</h3>
      <div className="mt-2 text-xl">{formatTime(timeLeft)}</div>
      {isRunning && timeLeft === 0 && <p>Break complete!</p>}
    </div>
  );
};

export default BreakTimer;
