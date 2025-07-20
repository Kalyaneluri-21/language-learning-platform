import React from "react";

const ChallengeCard = ({ title, currentDay, totalDays, onAction }) => {
  const isComplete = currentDay >= totalDays;
  return (
    <div className="challenge-card">
      <h3>{title}</h3>
      <div className="challenge-progress">
        {isComplete ? (
          <span className="challenge-complete">Challenge Complete!</span>
        ) : (
          <span>
            Day {currentDay} of {totalDays}
          </span>
        )}
      </div>
      <button
        className="challenge-action"
        onClick={onAction}
        disabled={isComplete}
      >
        {isComplete
          ? "Completed"
          : currentDay === 0
          ? "Join Challenge"
          : "Update Progress"}
      </button>
    </div>
  );
};

export default ChallengeCard;
