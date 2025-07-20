import React from "react";

const LessonCard = ({ title, level, type, onStart }) => {
  return (
    <div className="lesson-card">
      <h3>{title}</h3>
      <p>
        <strong>Level:</strong> {level}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <button onClick={onStart}>Start Lesson</button>
    </div>
  );
};

export default LessonCard;
