import React from "react";

const ProgressCard = ({ label, value, icon, progress }) => {
  return (
    <div className="progress-card">
      {icon && <span className="progress-icon">{icon}</span>}
      <div className="progress-label">{label}</div>
      <div className="progress-value">{value}</div>
      {typeof progress === "number" && (
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ProgressCard;
