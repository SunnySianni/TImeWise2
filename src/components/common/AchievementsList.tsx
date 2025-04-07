// components/achievements/AchievementsList.tsx
import React from 'react';
import { useAchievements } from '@/context/AchievementsContext';

const AchievementsList: React.FC = () => {
  const { achievements } = useAchievements();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="bg-white rounded-md p-4 shadow border border-gray-200"
        >
          <h3 className="text-lg font-semibold">{achievement.name}</h3>
          <p className="text-sm">
            {achievement.unlocked ? "✅ Unlocked!" : "🔒 Locked"}
          </p>
          <progress
            className="w-full mt-2"
            value={achievement.progress}
            max={100}
          />
        </div>
      ))}
    </div>
  );
};

export default AchievementsList;
