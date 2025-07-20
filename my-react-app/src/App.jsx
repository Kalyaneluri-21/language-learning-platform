import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Lessons from "./Lessons";
import Progress from "./Progress";
import CulturalInsights from "./CulturalInsights";
import WeeklyChallenge from "./WeeklyChallenge";
import LectureView from "./LectureView";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/:lectureId" element={<LectureView />} />
        <Route path="progress" element={<Progress />} />
        <Route path="insights" element={<CulturalInsights />} />
        <Route path="challenge" element={<WeeklyChallenge />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
