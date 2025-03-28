import React, { createContext, useContext, useState, useEffect } from "react";

// Define the Achievement structure
interface Achievement {
  id: string;
  name: string;
  progress: number; // Represents the progress as a percentage (0 - 100)
  unlocked: boolean; // Boolean flag to track whether the achievement is unlocked
}

// Define the context structure
interface AchievementsContextType {
  achievements: Achievement[];
  streak: number;
  weeklyFocusGoal: number; // The user's weekly focus goal in minutes
  weeklyFocusTime: number; // The user's total focus time for the week in minutes
  addAchievement: (achievement: Achievement) => void;
  incrementStreak: () => void;
  updateProgress: (id: string, progress: number) => void;
  unlockAchievement: (id: string) => void;
  setWeeklyFocusGoal: (goal: number) => void; // Set weekly focus goal
  updateWeeklyFocusTime: (sessionDuration: number) => void; // Update weekly focus time
}

// Default achievements list 🎮
const defaultAchievements: Achievement[] = [
  { id: "1", name: "First Focus", progress: 0, unlocked: false },
  { id: "2", name: "Steady Starter", progress: 0, unlocked: false },
  { id: "3", name: "Focus Apprentice", progress: 0, unlocked: false },
  { id: "4", name: "Zen Master", progress: 0, unlocked: false },
  { id: "5", name: "Ultimate Focus", progress: 0, unlocked: false },
  { id: "6", name: "Early Bird", progress: 0, unlocked: false },
  { id: "7", name: "Night Owl", progress: 0, unlocked: false },
  { id: "8", name: "Long Hauler", progress: 0, unlocked: false },
  { id: "9", name: "Consistency King", progress: 0, unlocked: false },
  { id: "10", name: "Session Marathon", progress: 0, unlocked: false },
];

// Create the context
const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

// Provider component
export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [streak, setStreak] = useState<number>(0);
  const [weeklyFocusGoal, setWeeklyFocusGoal] = useState<number>(10 * 60); // Default: 10 hours in minutes
  const [weeklyFocusTime, setWeeklyFocusTime] = useState<number>(0); // Total focus time for the week in minutes

  // Load saved achievements, streak, and focus goal from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem("achievements");
    const savedStreak = localStorage.getItem("streak");
    const savedGoal = localStorage.getItem("weeklyFocusGoal");
    const savedFocusTime = localStorage.getItem("weeklyFocusTime");

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
    if (savedStreak) {
      setStreak(Number(savedStreak));
    }
    if (savedGoal) {
      setWeeklyFocusGoal(Number(savedGoal));
    }
    if (savedFocusTime) {
      setWeeklyFocusTime(Number(savedFocusTime));
    }
  }, []);

  // Save achievements, streak, focus goal, and focus time to localStorage
  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements));
    localStorage.setItem("streak", streak.toString());
    localStorage.setItem("weeklyFocusGoal", weeklyFocusGoal.toString());
    localStorage.setItem("weeklyFocusTime", weeklyFocusTime.toString());
  }, [achievements, streak, weeklyFocusGoal, weeklyFocusTime]);

  // Add new achievements dynamically
  const addAchievement = (achievement: Achievement) => {
    setAchievements((prevAchievements) => [...prevAchievements, achievement]);
  };

  // Increment streak count
  const incrementStreak = () => {
    setStreak((prevStreak) => prevStreak + 1);
  };

  // Update progress and auto-unlock achievements
  const updateProgress = (id: string, progress: number) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === id
          ? {
              ...achievement,
              progress: Math.min(progress, 100),
              unlocked: Math.min(progress, 100) === 100, // Auto-unlock when reaching 100%
            }
          : achievement
      )
    );
  };

  // Unlock achievement manually
  const unlockAchievement = (id: string) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === id
          ? { ...achievement, unlocked: true } // Unlock achievement
          : achievement
      )
    );
  };

  // Set weekly focus goal
  const setWeeklyFocusGoalHandler = (goal: number) => {
    setWeeklyFocusGoal(goal * 60); // Convert goal to minutes
  };

  // Update weekly focus time
  const updateWeeklyFocusTime = (sessionDuration: number) => {
    setWeeklyFocusTime((prevFocusTime) => prevFocusTime + sessionDuration);
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

// Custom hook to use the AchievementsContext
export const useAchievements = (): AchievementsContextType => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
};
