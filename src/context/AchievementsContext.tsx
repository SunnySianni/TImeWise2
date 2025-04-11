import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Achievement {
  id: string;
  name: string;
  progress: number;
  unlocked: boolean;
}

interface AchievementsContextType {
  achievements: Achievement[];
  streak: number;
  weeklyFocusTime: number;
  updateProgress: (achievementId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreakAndGoals: (timeSpent: number) => void;
  incrementWeeklyFocusTime: (minutes: number) => void;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

interface AchievementsProviderProps {
  children: ReactNode;
}

const AchievementsProvider: React.FC<AchievementsProviderProps> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "1", name: "Complete first session", progress: 0, unlocked: false },
    { id: "2", name: "25% weekly goal", progress: 0, unlocked: false },
    { id: "3", name: "50% weekly goal", progress: 0, unlocked: false },
    { id: "4", name: "75% weekly goal", progress: 0, unlocked: false },
    { id: "5", name: "100% weekly goal", progress: 0, unlocked: false },
    { id: "6", name: "5 focus sessions in one day", progress: 0, unlocked: false },
    { id: "7", name: "3-day streak", progress: 0, unlocked: false },
    { id: "8", name: "7-day streak", progress: 0, unlocked: false },
    { id: "9", name: "10 hours of focus time", progress: 0, unlocked: false },
    { id: "10", name: "25 hours of focus time", progress: 0, unlocked: false },
    { id: "11", name: "50 hours of focus time", progress: 0, unlocked: false },
    { id: "12", name: "Take a break after a session", progress: 0, unlocked: false },
    { id: "13", name: "Complete a 90-minute deep work session", progress: 0, unlocked: false },
    { id: "14", name: "Late-night session", progress: 0, unlocked: false },
    { id: "15", name: "Plan a focus session", progress: 0, unlocked: false },
  ]);

  const [streak, setStreak] = useState(0);
  const [weeklyFocusTime, setWeeklyFocusTime] = useState(0); // in minutes

  const updateProgress = (achievementId: string, progress: number) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, progress }
          : achievement
      )
    );
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true }
          : achievement
      )
    );
  };

  const incrementWeeklyFocusTime = (minutes: number) => {
    setWeeklyFocusTime((prev) => prev + minutes);
  };

  const updateStreakAndGoals = (timeSpent: number) => {
    setStreak((prevStreak) => prevStreak + 1);

    const percentOfGoal = (weeklyFocusTime + timeSpent) / (60 * 4) * 100; // Example: 4-hour weekly goal
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) => {
        if (achievement.id === "2" && percentOfGoal >= 25 && !achievement.unlocked) {
          return { ...achievement, progress: 25, unlocked: true };
        }
        if (achievement.id === "3" && percentOfGoal >= 50 && !achievement.unlocked) {
          return { ...achievement, progress: 50, unlocked: true };
        }
        if (achievement.id === "4" && percentOfGoal >= 75 && !achievement.unlocked) {
          return { ...achievement, progress: 75, unlocked: true };
        }
        if (achievement.id === "5" && percentOfGoal >= 100 && !achievement.unlocked) {
          return { ...achievement, progress: 100, unlocked: true };
        }
        return achievement;
      })
    );
  };

  // Reset weekly focus time every Sunday at midnight
  useEffect(() => {
    const now = new Date();
    const nextReset = new Date(now);
    nextReset.setDate(now.getDate() + (7 - now.getDay()));
    nextReset.setHours(0, 0, 0, 0);
    const msUntilReset = nextReset.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setWeeklyFocusTime(0);
    }, msUntilReset);

    return () => clearTimeout(timer);
  }, [weeklyFocusTime]);

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        streak,
        weeklyFocusTime,
        updateProgress,
        unlockAchievement,
        updateStreakAndGoals,
        incrementWeeklyFocusTime,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

const useAchievements = (): AchievementsContextType => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
};

export { AchievementsProvider, useAchievements };
