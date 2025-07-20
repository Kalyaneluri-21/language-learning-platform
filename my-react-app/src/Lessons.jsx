import React from "react";
import { useNavigate } from "react-router-dom";
import LessonCard from "./LessonCard";

const lessons = [
  {
    id: "greetings",
    title: "Basic Greetings",
    level: "Beginner",
    type: "Vocabulary",
  },
  {
    id: "questions",
    title: "Simple Questions",
    level: "Beginner",
    type: "Grammar",
  },
  {
    id: "numbers",
    title: "Numbers & Counting",
    level: "Beginner",
    type: "Vocabulary",
  },
  {
    id: "present-verbs",
    title: "Present Tense Verbs",
    level: "Intermediate",
    type: "Grammar",
  },
  {
    id: "phrases",
    title: "Common Phrases",
    level: "Beginner",
    type: "Vocabulary",
  },
];

const Lessons = () => {
  const navigate = useNavigate();
  const handleStartLesson = (id) => {
    navigate(`/dashboard/lessons/${id}`);
  };
  return (
    <div className="lessons-section">
      <h2>Your Lessons</h2>
      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            title={lesson.title}
            level={lesson.level}
            type={lesson.type}
            onStart={() => handleStartLesson(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
