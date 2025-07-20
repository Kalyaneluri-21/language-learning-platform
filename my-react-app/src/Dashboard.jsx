import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { database, auth } from "./firebase";
import { ref, get } from "firebase/database";
import { signOut } from "firebase/auth";
import Navbar from "./Navbar";

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
