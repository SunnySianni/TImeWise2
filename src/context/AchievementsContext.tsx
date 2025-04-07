import React, { createContext, useContext, useState, useEffect } from "react";

// Define the Achievement structure
interface Achievement {
  id: string;
  name: string;
  progress: number; // Progress as a percentage (0 - 100)
  unlocked: boolean;
}

// Context structure
interface AchievementsContextType {
  achievements: Achievement[];
  streak: number;
  weeklyFocusGoal: number;
  weeklyFocusTime: number;
  addAchievement: (achievement: Achievement) => void;
  incrementStreak: () => void;
  updateProgress: (id: string, progress: number) => void;
  unlockAchievement: (id: string) => void;
  setWeeklyFocusGoal: (goal: number) => void;
  updateWeeklyFocusTime: (sessionDuration: number) => void;
}

const defaultAchievements: Achievement[] = [
  { id: "1", name: "First Focus", progress: 0, unlocked: false },
  { id: "2", name: "Steady Starter", progress: 0, unlocked: false }, // 1 hour
  { id: "3", name: "Focus Apprentice", progress: 0, unlocked: false }, // 3 hours
  { id: "4", name: "Zen Master", progress: 0, unlocked: false }, // 5 hours
  { id: "5", name: "Ultimate Focus", progress: 0, unlocked: false }, // 10 hours
  { id: "6", name: "Early Bird", progress: 0, unlocked: false }, // Morning session
  { id: "7", name: "Night Owl", progress: 0, unlocked: false }, // Late session
  { id: "8", name: "Long Hauler", progress: 0, unlocked: false }, // Long session
  { id: "9", name: "Consistency King", progress: 0, unlocked: false }, // Daily streaks
  { id: "10", name: "Session Marathon", progress: 0, unlocked: false }, // 10+ sessions
];

// Context setup
const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [streak, setStreak] = useState<number>(0);
  const [weeklyFocusGoal, setWeeklyFocusGoal] = useState<number>(10 * 60); // 10 hours default
  const [weeklyFocusTime, setWeeklyFocusTime] = useState<number>(0);

  // Load from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem("achievements");
    const savedStreak = localStorage.getItem("streak");
    const savedGoal = localStorage.getItem("weeklyFocusGoal");
    const savedFocusTime = localStorage.getItem("weeklyFocusTime");

    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedStreak) setStreak(Number(savedStreak));
    if (savedGoal) setWeeklyFocusGoal(Number(savedGoal));
    if (savedFocusTime) setWeeklyFocusTime(Number(savedFocusTime));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements));
    localStorage.setItem("streak", streak.toString());
    localStorage.setItem("weeklyFocusGoal", weeklyFocusGoal.toString());
    localStorage.setItem("weeklyFocusTime", weeklyFocusTime.toString());
  }, [achievements, streak, weeklyFocusGoal, weeklyFocusTime]);

  // Add custom achievements
  const addAchievement = (achievement: Achievement) => {
    setAchievements((prev) => [...prev, achievement]);
  };

  // Streak logic (e.g. 1 session/day = +1 streak)
  const incrementStreak = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);

    // Update progress for Consistency King (9): 7-day streak = 100%
    const progress = Math.min((newStreak / 7) * 100, 100);
    updateProgress("9", progress);
  };

  // Update any achievement's progress and unlock if 100%
  const updateProgress = (id: string, progress: number) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === id
          ? {
              ...achievement,
              progress: Math.min(progress, 100),
              unlocked: progress >= 100,
            }
          : achievement
      )
    );
  };

  // Manually unlock an achievement
  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === id ? { ...achievement, unlocked: true, progress: 100 } : achievement
      )
    );
  };

  // Set weekly goal in minutes
  const setWeeklyFocusGoalHandler = (goal: number) => {
    setWeeklyFocusGoal(goal * 60); // convert hours to minutes
  };

  // ✅ Update focus time, streak, and achievement progress
  const updateWeeklyFocusTime = (sessionDuration: number) => {
    const now = new Date();
    const hour = now.getHours();

    setWeeklyFocusTime((prev) => {
      const newTotal = prev + sessionDuration;

      // Progress toward weekly goal (achievement 5)
      const weeklyProgress = Math.min((newTotal / weeklyFocusGoal) * 100, 100);
      updateProgress("5", weeklyProgress); // Ultimate Focus

      // Unlock time-based achievements as progress builds
      updateProgress("2", Math.min((newTotal / 60) * 100, 100)); // 1 hour
      updateProgress("3", Math.min((newTotal / (3 * 60)) * 100, 100)); // 3 hours
      updateProgress("4", Math.min((newTotal / (5 * 60)) * 100, 100)); // 5 hours

      // First focus
      if (sessionDuration > 0) unlockAchievement("1");

      // Long hauler (achievement 8): 90+ min session
      if (sessionDuration >= 90) unlockAchievement("8");

      // Early bird (6) if session before 9 AM
      if (hour < 9) unlockAchievement("6");

      // Night owl (7) if session after 10 PM
      if (hour >= 22) unlockAchievement("7");

      return newTotal;
    });

    incrementStreak(); // Always increment streak on focus
  };

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        streak,
        weeklyFocusGoal,
        weeklyFocusTime,
        addAchievement,
        incrementStreak,
        updateProgress,
        unlockAchievement,
        setWeeklyFocusGoal: setWeeklyFocusGoalHandler,
        updateWeeklyFocusTime,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

// Custom hook
export const useAchievements = (): AchievementsContextType => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
};
