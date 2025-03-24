"use client"; // Mark this file as a client-side component

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"; // Import Recharts for the chart

interface Achievement {
  id: string;
  name: string;
  unlocked: boolean;
  criteria: any;
}

interface AchievementsContextType {
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (id: string, progress: number) => void; // Update progress based on user actions
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Loading achievements from localStorage to persist progress across sessions
  const storedAchievements = typeof window !== "undefined" ? localStorage.getItem("achievements") : null;
  const initialAchievements = storedAchievements
    ? JSON.parse(storedAchievements)
    : [
        { id: "first_session_complete", name: "First Session Complete", unlocked: false, criteria: { sessions: 1 } },
        { id: "five_sessions_complete", name: "Five Sessions Completed", unlocked: false, criteria: { sessions: 5 } },
        { id: "ten_sessions_complete", name: "Ten Sessions Completed", unlocked: false, criteria: { sessions: 10 } },
        { id: "power_user", name: "Power User (50 sessions)", unlocked: false, criteria: { sessions: 50 } },
        { id: "focus_master", name: "Focus Master (Focus for 25 minutes)", unlocked: false, criteria: { focusTime: 25 } },
        { id: "streak_achievement", name: "Streak Achievement (Complete 5 sessions in a row)", unlocked: false, criteria: { streak: 5 } },
        { id: "break_time", name: "Taking a Break (After every session)", unlocked: false, criteria: { breakTime: true } },
        { id: "no_break_focus", name: "No Break Focus (Complete 3 sessions without a break)", unlocked: false, criteria: { noBreakSessions: 3 } },
        { id: "night_owl", name: "Night Owl (Complete a session after 10 PM)", unlocked: false, criteria: { nightSession: true } },
        { id: "early_bird", name: "Early Bird (Complete a session before 6 AM)", unlocked: false, criteria: { earlySession: true } },
        { id: "consistent", name: "Consistent (Complete sessions for 7 days straight)", unlocked: false, criteria: { consecutiveDays: 7 } },
      ];

  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  // Persist achievements to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("achievements", JSON.stringify(achievements));
    }
  }, [achievements]);

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === achievementId ? { ...achievement, unlocked: true } : achievement
      )
    );
  };

  const updateProgress = (id: string, progress: number) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) => {
        if (achievement.id === id) {
          if (achievement.criteria.sessions && progress >= achievement.criteria.sessions) {
            return { ...achievement, unlocked: true };
          }
          if (achievement.criteria.focusTime && progress >= achievement.criteria.focusTime) {
            return { ...achievement, unlocked: true };
          }
          if (achievement.criteria.streak && progress >= achievement.criteria.streak) {
            return { ...achievement, unlocked: true };
          }
        }
        return achievement;
      })
    );
  };

  // Calculate the unlocked achievements count
  const unlockedAchievements = achievements.filter((achievement) => achievement.unlocked).length;
  const totalAchievements = achievements.length;
  const unlockedPercentage = (unlockedAchievements / totalAchievements) * 100;

  // Data for the PieChart
  const chartData = [
    { name: "Unlocked", value: unlockedAchievements },
    { name: "Locked", value: totalAchievements - unlockedAchievements },
  ];

  return (
    <AchievementsContext.Provider value={{ achievements, unlockAchievement, updateProgress }}>
      {children}

      {/* Chart showing achievement progress */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Achievements Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === "Unlocked" ? "#4CAF50" : "#f44336"} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AchievementsContext.Provider>
  );
};

export const useAchievements = (): AchievementsContextType => {
  const context = useContext(AchievementsContext);

  if (!context) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }

  return context;
};

export { AchievementsContext };
