import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, get } from "firebase/database";

const lectures = [
  { id: "greetings", title: "Basic Greetings" },
  { id: "questions", title: "Simple Questions" },
  { id: "numbers", title: "Numbers & Counting" },
  { id: "present-verbs", title: "Present Tense Verbs" },
  { id: "phrases", title: "Common Phrases" },
];

const Progress = () => {
  const [completedLectures, setCompletedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setCompletedLectures([]);
        setStreak(null);
        setLoading(false);
        return;
      }
      try {
        const progressRef = ref(
          database,
          `users/${userId}/progress/completedLectures`
        );
        const streakRef = ref(database, `users/${userId}/progress/streak`);
        const [completedSnap, streakSnap] = await Promise.all([
          get(progressRef),
          get(streakRef),
        ]);
        if (completedSnap.exists() && Array.isArray(completedSnap.val())) {
          setCompletedLectures(completedSnap.val());
        } else {
          setCompletedLectures([]);
        }
        if (streakSnap.exists() && streakSnap.val().count) {
          setStreak(streakSnap.val().count);
        } else {
          setStreak(1);
        }
      } catch (err) {
        setCompletedLectures([]);
        setStreak(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const totalLectures = lectures.length;
  const completedCount = completedLectures.length;
  const completedLectureNames = lectures
    .filter((l) => completedLectures.includes(l.id))
    .map((l) => l.title);
  const progressPercent = totalLectures
    ? Math.round((completedCount / totalLectures) * 100)
    : 0;

  return (
    <div className="progress-section">
      <h2>Your Progress</h2>
      <div className="lecture-progress-list" style={{ marginTop: "2rem" }}>
        <h3>Lecture Completion</h3>
        <div className="lecture-progress-bar-bg">
          <div
            className="lecture-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div
          style={{
            margin: "0.5rem 0 1rem 0",
            color: "#646cff",
            fontWeight: 500,
          }}
        >
          {completedCount} out of {totalLectures} completed
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : completedCount === 0 ? (
          <div>No lectures completed yet.</div>
        ) : (
          <ul>
            {completedLectureNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
      </div>
      <div
        className="streak-section"
        style={{
          marginTop: "2rem",
          fontWeight: 500,
          color: "#ff9800",
          fontSize: "1.2rem",
        }}
      >
        {loading
          ? null
          : streak
          ? `Daily Streak: ${streak} day${streak > 1 ? "s" : ""}`
          : "Daily Streak: 1 day"}
      </div>
    </div>
  );
};

export default Progress;
