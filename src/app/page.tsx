'use client';

import { SettingsProvider } from "@/context/SettingsContext";
import React, { useState, useEffect } from "react";
import TimerControls from "@/components/timer/TimerControls";
import { useAchievements, AchievementsProvider } from "@/context/AchievementsContext";
import { useTimer, TimerProvider } from "@/context/TimerContext"; // ✅ Import TimerProvider
import HistoryComponent from "../components/data/HistoryComponent";

type TimerState = "idle" | "running" | "paused";

const TimerPage: React.FC = () => {
  return (
    <SettingsProvider>
      <AchievementsProvider>
        <TimerProvider> {/* Ensure TimerProvider wraps the component tree */}
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
  const [timeRemaining, setTimeRemaining] = useState<number>(25 * 60); // 25 minutes
  const [sessionComplete, setSessionComplete] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const { updateStreakAndGoals } = useAchievements();
  const { completeSession, sessionHistory, setDuration } = useTimer();

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
    setDuration(newTime);
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

      const sessionDuration = 25 * 60; // or use timeRemaining if it was customized

      updateStreakAndGoals(sessionDuration);

      completeSession({
        type: "focus",
        duration: sessionDuration,
        completed: true,
        timestamp: new Date().toISOString(), // ✅ Include timestamp
      });
    }

    return () => clearInterval(interval);
  }, [timerState, timeRemaining, updateStreakAndGoals, completeSession]);

  if (!hasMounted) return null;

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
