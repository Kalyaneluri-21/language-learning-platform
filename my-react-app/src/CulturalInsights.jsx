import React from "react";
import InsightCard from "./InsightCard";

const insights = [
  {
    title: "Greetings in Spain",
    description:
      "In Spain, a common greeting is a kiss on both cheeks, even for first-time meetings!",
  },
  {
    title: "Japanese Bowing Etiquette",
    description:
      "Bowing in Japan shows respect. The depth and duration of the bow can change its meaning.",
  },
  {
    title: "French Meal Times",
    description:
      "Lunch in France is often a long, social affair, sometimes lasting up to two hours.",
  },
];

const CulturalInsights = () => {
  const handleReadMore = (title) => {
    console.log(`Read more: ${title}`);
  };
  return (
    <div className="insights-section">
      <h2>Cultural Insights</h2>
      <div className="insights-grid">
        {insights.map((insight) => (
          <InsightCard
            key={insight.title}
            title={insight.title}
            description={insight.description}
            onReadMore={() => handleReadMore(insight.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default CulturalInsights;
