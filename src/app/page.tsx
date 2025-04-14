'use client';

import { SettingsProvider } from "@/context/SettingsContext";
import React, { useState, useEffect } from "react";
import TimerControls from "@/components/timer/TimerControls";
import { useAchievements, AchievementsProvider } from "@/context/AchievementsContext";
import { TimerProvider, useTimer } from "@/context/TimerContext";  // Correct import of useTimer
import HistoryComponent from "../components/data/HistoryComponent";

type TimerState = "idle" | "running" | "paused";

const TimerPage: React.FC = () => {
  return (
    <SettingsProvider>
      <AchievementsProvider>
        <TimerProvider>  {/* Wrap TimerComponent with TimerProvider */}
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
            <TimerComponent />
          </div>
        </TimerProvider>
      </AchievementsProvider>
    </SettingsProvider>
  );
};

const TimerComponent: React.FC = () => {
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [timeRemaining, setTimeRemaining] = useState<number>(25 * 60);
  const [sessionComplete, setSessionComplete] = useState<boolean>(false);

  const { updateStreakAndGoals } = useAchievements();
  const { completeSession, sessionHistory, setDuration } = useTimer();  // Use useTimer here

  const handleStartPause = () => {
    setTimerState((prev) => (prev === "running" ? "paused" : "running"));
  };

  const handleReset = () => {
    setTimeRemaining(25 * 60);
    setTimerState("idle");
    setSessionComplete(false);
  };

  const handleTimeChange = (newTime: number) => {
    setTimeRemaining(newTime);
    setDuration(newTime); // Update the timer's duration in the context
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState === "running" && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerState === "running") {
      setSessionComplete(true);
      setTimerState("idle");

      updateStreakAndGoals(timeRemaining); // Update streak and goals with actual remaining time

      // Complete session by logging it with the updated 'completeSession' logic
      completeSession();

      // Reset session state for next round
    }

    return () => clearInterval(interval);
  }, [timerState, timeRemaining, updateStreakAndGoals, completeSession]);

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

      <div className="mt-6 w-full max-w-md">
        <HistoryComponent sessions={sessionHistory} />
      </div>
    </div>
  );
};

export default TimerPage;
