import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "./firebase";
import { ref, get, set, update } from "firebase/database";

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
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const lecture = lectures.find((l) => l.id === lectureId);

  const handleMarkCompleted = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const progressRef = ref(
        database,
        `users/${userId}/progress/completedLectures`
      );
      const snapshot = await get(progressRef);
      let completedLectures = [];
      if (snapshot.exists()) {
        completedLectures = snapshot.val();
        if (!Array.isArray(completedLectures)) completedLectures = [];
      }
      if (!completedLectures.includes(lectureId)) {
        completedLectures.push(lectureId);
        await set(progressRef, completedLectures);
      }
      setCompleted(true);
    } catch (err) {
      alert("Failed to mark as completed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <button
        className="mark-completed-btn"
        onClick={handleMarkCompleted}
        disabled={completed || loading}
      >
        {completed
          ? "Completed!"
          : loading
          ? "Marking..."
          : "Mark as Completed"}
      </button>
      {completed && (
        <div className="completed-msg">Lecture marked as completed!</div>
      )}
    </div>
  );
};

export default LectureView;
