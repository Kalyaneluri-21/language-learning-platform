import React from "react";

const InsightCard = ({ title, description, onReadMore }) => {
  return (
    <div className="insight-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {onReadMore && (
        <button className="insight-readmore" onClick={onReadMore}>
          Read More
        </button>
      )}
    </div>
  );
};

export default InsightCard;
