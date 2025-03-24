'use client';  // Ensure this file runs on the client-side
import { SettingsProvider } from "@/context/SettingsContext";
import React, { useState, useEffect } from "react";
import TimerControls from "@/components/timer/TimerControls"; // Import TimerControls
import { useAchievements } from "@/context/AchievementsContext"; // Import the achievements context
import HistoryComponent from "@/components/data/HistoryComponent"; // Import the HistoryComponent

// Define timer state types
type TimerState = "idle" | "running" | "paused";

const TimerPage: React.FC = () => {
  return (
    <SettingsProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
        <TimerComponent />
      </div>
    </SettingsProvider>
  );
};

const TimerComponent: React.FC = () => {
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [timeRemaining, setTimeRemaining] = useState<number>(25 * 60); // Default to 25-minute session in seconds
  const [sessionComplete, setSessionComplete] = useState<boolean>(false);

  const { achievements, unlockAchievement } = useAchievements(); // Use achievements context

  // Handle start/pause functionality
  const handleStartPause = () => {
    if (timerState === "running") {
      setTimerState("paused");
    } else {
      setTimerState("running");
    }
  };

  // Reset functionality
  const handleReset = () => {
    setTimeRemaining(25 * 60); // Reset to default 25 minutes
    setTimerState("idle");
    setSessionComplete(false);
  };

  // Update the time based on user input
  const handleTimeChange = (time: number) => {
    setTimeRemaining(time);
    setTimerState("idle"); // Ensure timer is idle when the time is updated
    setSessionComplete(false); // Reset the session complete state
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState === "running" && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerState === "running") {
      setSessionComplete(true); // Mark session complete when time is up
      setTimerState("idle");
      unlockAchievement("first_session_complete"); // Unlock achievement after the first session is complete
    }

    // Cleanup the interval on component unmount or when timer is paused
    return () => clearInterval(interval);
  }, [timerState, timeRemaining, unlockAchievement]);

  // Display achievements
  const displayAchievements = () => (
    <div className="mt-6">
      <h2 className="text-xl text-white font-semibold">Achievements</h2>
      <ul className="mt-2 text-white">
        {achievements.map((achievement) => (
          <li key={achievement.id} className={`py-1 ${achievement.unlocked ? "text-green-400" : "text-gray-400"}`}>
            {achievement.name} - {achievement.unlocked ? "Unlocked" : "Locked"}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white mb-8">Focus Timer</h1>

      <div className="w-full max-w-md">
        <TimerControls
          timeRemaining={timeRemaining}
          timerState={timerState}
          onStartPause={handleStartPause}
          onReset={handleReset}
          onTimeChange={handleTimeChange}
        />
      </div>

      {sessionComplete && (
        <div className="mt-4 text-2xl font-semibold text-white">Session Complete!</div>
      )}

      {/* Display History Component */}
      <HistoryComponent />
    </div>
  );
};

export default TimerPage;
