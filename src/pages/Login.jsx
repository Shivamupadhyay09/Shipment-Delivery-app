import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login to SwiftShip</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          style={styles.input}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>
        <p style={styles.note}>
          Don’t have an account? <a href="/register" style={styles.link}>Register</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor:"#f0fff4",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor:"#f0fff4",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    boxSizing: "border-box",
  },
  title: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#0d6efd",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  note: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#0d6efd",
    textDecoration: "none",
    fontWeight: "bold",
  }
};
