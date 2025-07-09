import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={styles.wrapper}>
      <style>
        {`
          .main-button {
            padding: 12px 24px;
            background-color: #28a745;
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
            transition: all 0.3s ease;
            display: inline-block;
          }
          .main-button:hover {
            background-color: #007bff;
            transform: translateY(-2px);
            box-shadow: 0 6px 14px rgba(0, 123, 255, 0.5);
          }
          .main-button:active {
            background-color: #0056b3;
            transform: scale(0.98);
          }
        `}
      </style>

      <div style={styles.container}>
        <h1 style={styles.heading}>
          📦 Welcome to <span style={styles.brand}>SwiftShip</span>
        </h1>
        <p style={styles.subheading}>
          {user ? (
            <>Hello, <strong>{user.email}</strong> 👋</>
          ) : (
            <>
              Please{" "}
              <Link to="/login" style={styles.link}>Login</Link> or{" "}
              <Link to="/register" style={styles.link}>Register</Link> to get started.
            </>
          )}
        </p>

        <div style={styles.description}>
          <p>🔵Instant and reliable door-to-door delivery service.</p>
          <p>🔵Track your shipments in real-time with live updates.</p>
          <p>🔵Simplified shipment management for hassle-free logistics.</p>
        </div>

        {user && (
          <div style={styles.buttons}>
            <Link to="/new-shipment" className="main-button">Create New Shipment</Link>
            <Link to="/my-shipments" className="main-button">View My Shipments</Link>
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        © 2025 Shivam Upadhyay — All rights reserved.
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "89vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f0fff4",
  },
  container: {
    textAlign: "center",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#2d4739",
  },
  brand: {
    color: "#28a745",
  },
  subheading: {
    fontSize: "16px",
    color: "#444",
  },
  description: {
    marginTop: "24px",
    color: "#333",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  link: {
    color: "#28a745",
    textDecoration: "underline",
    fontWeight: "bold",
  },
  buttons: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  footer: {
    textAlign: "center",
    padding: "14px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#000",
  }
};
