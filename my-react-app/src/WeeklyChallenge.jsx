import React, { useState } from "react";
import ChallengeCard from "./ChallengeCard";

const challenge = {
  title: "Speak Spanish for 5 minutes a day",
  totalDays: 5,
};

const WeeklyChallenge = () => {
  const [challengeDay, setChallengeDay] = useState(2); // static for now
  const handleChallengeAction = () => {
    setChallengeDay((prev) => {
      const next = prev < challenge.totalDays ? prev + 1 : prev;
      console.log(`Challenge progress: Day ${next} of ${challenge.totalDays}`);
      return next;
    });
  };
  return (
    <div className="challenge-section">
      <h2>Weekly Challenge</h2>
      <ChallengeCard
        title={challenge.title}
        currentDay={challengeDay}
        totalDays={challenge.totalDays}
        onAction={handleChallengeAction}
      />
    </div>
  );
};

export default WeeklyChallenge;
