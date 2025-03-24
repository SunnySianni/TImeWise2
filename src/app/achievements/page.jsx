"use client"; // Mark this file as a client-side component

import React, { useContext } from "react";
import { AchievementsContext } from "../../context/AchievementsContext";
import ProgressBar from "../../components/common/ProgressBar";

const Achievements = () => {
  const { achievements, streak } = useContext(AchievementsContext);

  return (
    <div className="achievements-page">
      <h1>Achievements</h1>
      <div className="streak">
        <h2>Current Streak: {streak} sessions</h2>
      </div>
      <div className="achievements-list">
        <h2>Achievements</h2>
        {achievements.map((achievement) => (
          <div key={achievement.id} className="achievement">
            <h3>{achievement.name}</h3>
            <ProgressBar progress={achievement.progress} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
