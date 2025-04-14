import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { saveToStorage, getFromStorage } from "../components/data/StorageHelper";

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

// ⏱️ Default achievements list
const defaultAchievements: Achievement[] = [
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
];

const AchievementsProvider: React.FC<AchievementsProviderProps> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(
    getFromStorage<Achievement[]>("achievements", defaultAchievements)
  );
  const [streak, setStreak] = useState<number>(
    getFromStorage<number>("streak", 0)
  );
  const [weeklyFocusTime, setWeeklyFocusTime] = useState<number>(
    getFromStorage<number>("weeklyFocusTime", 0)
  );

  useEffect(() => {
    saveToStorage("achievements", achievements);
  }, [achievements]);

  useEffect(() => {
    saveToStorage("streak", streak);
  }, [streak]);

  useEffect(() => {
    saveToStorage("weeklyFocusTime", weeklyFocusTime);
  }, [weeklyFocusTime]);

  const updateProgress = (achievementId: string, progress: number) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId ? { ...achievement, progress } : achievement
      )
    );
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          toast.success(`🏆 Achievement Unlocked: ${achievement.name}`);
          return { ...achievement, unlocked: true };
        }
        return achievement;
      })
    );
  };

  const incrementWeeklyFocusTime = (minutes: number) => {
    setWeeklyFocusTime((prev) => prev + minutes);
  };

  const updateStreakAndGoals = (timeSpent: number) => {
    const newStreak = streak + 1;
    setStreak(newStreak);

    const newFocusTime = weeklyFocusTime + timeSpent;
    setWeeklyFocusTime(newFocusTime);

    const percentOfGoal = (newFocusTime / (60 * 4)) * 100;

    const newUnlockedIds: string[] = [];

    setAchievements((prev) =>
      prev.map((achievement) => {
        if (!achievement.unlocked) {
          if (
            (achievement.id === "2" && percentOfGoal >= 25) ||
            (achievement.id === "3" && percentOfGoal >= 50) ||
            (achievement.id === "4" && percentOfGoal >= 75) ||
            (achievement.id === "5" && percentOfGoal >= 100)
          ) {
            newUnlockedIds.push(achievement.id);
            return {
              ...achievement,
              progress: parseInt(achievement.name),
              unlocked: true,
            };
          }
        }
        return achievement;
      })
    );

    newUnlockedIds.forEach((id) => {
      const achievement = achievements.find((a) => a.id === id);
      if (achievement) {
        toast.success(`🎯 Goal Milestone Reached: ${achievement.name}`);
      }
    });
  };

  // ⏳ Reset weekly focus every Sunday at midnight
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
