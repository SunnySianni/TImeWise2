'use client'; // This marks the file as a client component

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the structure of an achievement
interface Achievement {
  id: string;
  name: string;
  unlocked: boolean;
}

// Define the structure of the context value
interface AchievementsContextType {
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
}

// Create the Achievements context with the correct type, ensuring the default value is undefined
const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first_session_complete', name: 'First Session Complete', unlocked: false },
    // Add other achievements as needed
  ]);

  // Function to unlock an achievement
  const unlockAchievement = (achievementId: string) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === achievementId ? { ...achievement, unlocked: true } : achievement
      )
    );
  };

  return (
    <AchievementsContext.Provider value={{ achievements, unlockAchievement }}>
      {children}
    </AchievementsContext.Provider>
  );
};

// Custom hook to use achievements context
export const useAchievements = (): AchievementsContextType => {
  const context = useContext(AchievementsContext);

  // Ensure the context is available
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementsProvider');
  }

  return context;
};
