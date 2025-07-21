import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, database } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      localStorage.setItem("userId", userId);
      // Fetch user role from database
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      let role = "user";
      if (snapshot.exists() && snapshot.val().role) {
        role = snapshot.val().role;
      }
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      let message = "Something went wrong. Please try again later.";
      if (err.code === "auth/invalid-credential") {
        message = "Invalid email or password. Please try again.";
      } else if (err.code === "auth/user-not-found") {
        message = "No user found with this email.";
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
