import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const lectures = [
  {
    id: "greetings",
    title: "Basic Greetings",
    video: "https://www.youtube.com/embed/1QnQm5lF3jY",
    description:
      "Learn how to greet people in different situations with common phrases and cultural tips.",
  },
  {
    id: "questions",
    title: "Simple Questions",
    video: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    description:
      "Master simple question forms and practice with real-life examples.",
  },
  {
    id: "numbers",
    title: "Numbers & Counting",
    video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    description: "Count from 1 to 100 and use numbers in daily conversation.",
  },
  {
    id: "present-verbs",
    title: "Present Tense Verbs",
    video: "https://www.youtube.com/embed/4Tr0otuiQuU",
    description: "Understand and use present tense verbs in context.",
  },
  {
    id: "phrases",
    title: "Common Phrases",
    video: "https://www.youtube.com/embed/5NV6Rdv1a3I",
    description: "Essential phrases for travel, shopping, and making friends.",
  },
];

const LectureView = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const lecture = lectures.find((l) => l.id === lectureId);

  if (!lecture) return <div>Lecture not found.</div>;

  return (
    <div className="lecture-view">
      <button
        onClick={() => navigate("/dashboard/lessons")}
        className="back-btn"
      >
        Back to Lessons
      </button>
      <h2>{lecture.title}</h2>
      {lecture.video && (
        <div className="lecture-video">
          <iframe
            width="560"
            height="315"
            src={lecture.video}
            title={lecture.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <p className="lecture-desc">{lecture.description}</p>
    </div>
  );
};

export default LectureView;
