import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { database, auth } from "./firebase";
import { ref, get, set, update } from "firebase/database";
import { signOut } from "firebase/auth";
import Navbar from "./Navbar";

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

const Dashboard = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    const fetchName = async () => {
      try {
        const snapshot = await get(ref(database, `users/${userId}`));
        if (snapshot.exists()) {
          setName(snapshot.val().name);
        }
      } catch (err) {
        setName("");
      } finally {
        setLoading(false);
      }
    };
    fetchName();
  }, [navigate]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const today = getToday();
    const yesterday = getYesterday();
    const streakRef = ref(database, `users/${userId}/progress/streak`);
    get(streakRef).then((snapshot) => {
      let streak = { lastVisit: today, count: 1 };
      if (snapshot.exists()) {
        streak = snapshot.val();
        if (streak.lastVisit === today) {
          // Already visited today, do nothing
          return;
        } else if (streak.lastVisit === yesterday) {
          // Consecutive day, increment
          update(streakRef, {
            lastVisit: today,
            count: (streak.count || 1) + 1,
          });
        } else {
          // Missed a day, reset
          set(streakRef, { lastVisit: today, count: 1 });
        }
      } else {
        set(streakRef, { lastVisit: today, count: 1 });
      }
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="dashboard-header">
        <span>Welcome, {name}!</span>
        <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      </div>
      <Navbar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
