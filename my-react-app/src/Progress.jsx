import React from "react";
import ProgressCard from "./ProgressCard";

const progressData = [
  { label: "Lessons Completed", value: 5, icon: "📘", progress: 50 },
  { label: "Words Learned", value: 30, icon: "📝", progress: 60 },
  { label: "Daily Streak", value: "3 Days", icon: "🔥", progress: 30 },
];

const Progress = () => {
  return (
    <div className="progress-section">
      <h2>Your Progress</h2>
      <div className="progress-grid">
        {progressData.map((item) => (
          <ProgressCard key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Progress;
