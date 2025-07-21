import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "./firebase";
import { signOut } from "firebase/auth";
import { ref, get } from "firebase/database";

const AdminDashboard = () => {
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
    <div style={{ maxWidth: 400, margin: "4rem auto", textAlign: "center" }}>
      <h2>Welcome, {name}!</h2>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "0.7rem 1.5rem",
          fontSize: "1rem",
          borderRadius: 4,
          background: "#646cff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
