"use client";

import React, { useState, useEffect } from "react";
import { useAchievements } from "src/context/AchievementsContext";
import Progress from "@/components/ui/Progress";
import AchievementsList from '@/components/common/AchievementsList';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AchievementsPage: React.FC = () => {
  const { achievements, streak, updateProgress, unlockAchievement } = useAchievements();
  const [filteredAchievements, setFilteredAchievements] = useState(achievements);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  // Update the filtered achievements list when achievements change
  useEffect(() => {
    setFilteredAchievements(achievements);
  }, [achievements]);

  // Automatically unlock achievements when progress reaches 100%
  useEffect(() => {
    achievements.forEach((achievement) => {
      if (!achievement.unlocked && achievement.progress >= 100) {
        unlockAchievement(achievement.id);
      }
    });
  }, [achievements, unlockAchievement]);

  const handleSearchChange = (filter: string) => {
    const filtered = achievements.filter((achievement) =>
      achievement.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredAchievements(filtered);
  };

  // Descriptions for each achievement with clear requirements
  const achievementDescriptions: { [key: string]: string } = {
    "1": "Complete your first focus session by running the timer for at least one full cycle.",
    "2": "Accumulate a total of 25% of your weekly focus goal.",
    "3": "Accumulate a total of 50% of your weekly focus goal.",
    "4": "Accumulate a total of 75% of your weekly focus goal.",
    "5": "Reach 100% of your weekly focus goal and achieve mastery!",
    "6": "Complete 5 focus sessions in a single day.",
    "7": "Maintain a 3-day focus streak without missing a session.",
    "8": "Maintain a 7-day focus streak without missing a session.",
    "9": "Reach a total of 10 hours of focused time.",
    "10": "Reach a total of 25 hours of focused time.",
    "11": "Reach a total of 50 hours of focused time.",
    "12": "Take at least one scheduled break after a focus session (instead of skipping it).",
    "13": "Complete a deep work session of at least 90 minutes without pausing.",
    "14": "Use the app for the first time after midnight (late-night productivity!).",
    "15": "Use the session planner to schedule at least one focus session in advance.",
  };

  const chartData = achievements.map((ach) => ({
    name: ach.name,
    progress: ach.progress,
  }));

  return (
    <div className="achievements-container p-6">
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>

      <input
        type="text"
        placeholder="Search achievements..."
        onChange={(e) => handleSearchChange(e.target.value)}
        className="search-bar p-2 border rounded-md w-full mb-4"
      />

      {/* Achievement Progress Bar Chart */}
      <div className="chart-container bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Achievement Progress</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* List of Achievements */}
      <div className="achievements-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card p-4 bg-white rounded-lg shadow-md ${
                achievement.unlocked ? "border-green-500" : "border-gray-300"
              }`}
              onClick={() =>
                setSelectedAchievement(
                  selectedAchievement === achievement.id ? null : achievement.id
                )
              }
            >
              <h3 className="font-semibold text-lg">{achievement.name}</h3>
              <p className="text-sm font-bold mt-2">
                Status: {achievement.unlocked ? "✅ Unlocked" : "🔒 Locked"}
              </p>

              <Progress value={achievement.progress} />

              {selectedAchievement === achievement.id && (
                <div className="achievement-description mt-2 p-2 bg-gray-200 rounded">
                  <p>{achievementDescriptions[achievement.id] || "No description available."}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No achievements found</p>
        )}
      </div>

      <div className="streak-container mt-6 text-center">
        <h2 className="text-xl font-semibold">🔥 Current Streak: {streak} days</h2>
      </div>
    </div>
  );
};

export default AchievementsPage;
