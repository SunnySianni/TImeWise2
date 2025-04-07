'use client'; // Mark this file as a client component 

import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from '../common/ProgressBar';
import { useSettings } from 'src/context/SettingsContext';
import { useAchievements } from 'src/context/AchievementsContext';

interface TimerControlsProps {
  timeRemaining: number;
  timerState: 'idle' | 'running' | 'paused';
  onStartPause: () => void;
  onReset: () => void;
  onTimeChange: (time: number) => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  timeRemaining,
  timerState,
  onStartPause,
  onReset,
  onTimeChange,
}) => {
  const [inputTime, setInputTime] = useState<number>(Math.floor(timeRemaining / 60));
  
  const { weeklyFocusGoal, updateWeeklyFocusTime } = useSettings();
  const { weeklyFocusTime } = useAchievements();

  const prevTimeRef = useRef(timeRemaining);

  const totalTime = 25 * 60;
  const progress = timeRemaining > 0 ? timeRemaining / totalTime : 0;

  // Detect session completion (transition from >0 to 0 with idle)
  useEffect(() => {
    if (
      prevTimeRef.current > 0 &&
      timeRemaining === 0 &&
      timerState === 'idle'
    ) {
      updateWeeklyFocusTime(inputTime); // Increment by current session duration in minutes
    }

    prevTimeRef.current = timeRemaining;
  }, [timeRemaining, timerState, inputTime, updateWeeklyFocusTime]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setInputTime(value);
      onTimeChange(value * 60);
    }
  };

  const weeklyProgress = weeklyFocusGoal > 0
    ? (weeklyFocusTime / (weeklyFocusGoal * 60)) * 100
    : 0;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Time Input */}
      <div className="mb-4">
        <input
          type="number"
          value={inputTime}
          onChange={handleTimeChange}
          className="p-2 rounded-md text-xl text-black"
          min="1"
        />
        <span className="text-xl ml-2">minutes</span>
      </div>

      {/* Circular Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Timer Display */}
      <div
        className={`text-5xl font-bold my-4 ${timerState === 'running' ? 'text-black' : 'text-white'}`}
      >
        {`${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`}
      </div>

      {/* Weekly Progress */}
      <div className="text-xs mb-4">
        <span>Weekly Focus Progress: {Math.floor(weeklyProgress)}%</span>
      </div>

      {/* Timer Controls */}
      <div className="flex space-x-4">
        <button
          onClick={onStartPause}
          className={`px-4 py-2 rounded-full ${timerState === 'running' ? 'bg-blue-500' : 'bg-green-500'}`}
        >
          {timerState === 'running' ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-full bg-red-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerControls;
