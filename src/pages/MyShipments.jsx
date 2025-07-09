import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function MyShipments() {
  const { user } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchShipments = async () => {
      try {
        const q = query(
          collection(db, "shipments"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShipments(data);
      } catch (err) {
        console.error("Error fetching shipments:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [user]);

  const statuses = ["Processed", "Shipped", "Out for Delivery", "Delivered"];

  const getStatusIndex = (status) => {
    const index = statuses.indexOf(status);
    return index !== -1 ? index : 0; // Default to "Processed" if not matched
  };

  if (loading) return <p style={styles.loading}>📦 Loading your shipments...</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>📋 My Shipments</h2>

      {shipments.length === 0 ? (
        <p style={styles.empty}>No shipments found. Try creating one!</p>
      ) : (
        <div style={styles.grid}>
          {shipments.map((s) => {
            const current = getStatusIndex(s.status);
            return (
              <div key={s.id} style={styles.card}>
                <h3 style={styles.receiver}>📦 To: {s.receiver}</h3>
                <p><strong>Size:</strong> {s.size}</p>
                <p><strong>Address:</strong> {s.address}</p>
                <p><strong>Sender:</strong> {s.sender}</p>
                <p style={styles.track}><strong>Track ID:</strong> <code>{s.id}</code></p>

                <div style={styles.verticalTracker}>
                  {statuses.map((status, index) => (
                    <div key={status} style={styles.stepRow}>
                      <div
                        style={{
                          ...styles.dot,
                          backgroundColor: index <= current ? "#28a745" : "#ccc",
                        }}
                      />
                      <span
                        style={{
                          ...styles.statusText,
                          color: index <= current ? "#28a745" : "#888",
                          fontWeight: index === current ? "bold" : "normal",
                        }}
                      >
                        {status}
                      </span>
                      {index !== statuses.length - 1 && (
                        <div style={styles.verticalLine} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
    color: "#28a745",
  },
  loading: {
    fontSize: "18px",
    textAlign: "center",
    marginTop: "60px",
    color: "#666",
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
    color: "#888",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  receiver: {
    color: "#0d6efd",
    marginBottom: "10px",
  },
  track: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  verticalTracker: {
    marginTop: "20px",
    position: "relative",
    paddingLeft: "16px",
  },
  stepRow: {
    position: "relative",
    paddingLeft: "14px",
    marginBottom: "30px",
  },
  dot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    position: "absolute",
    left: "-7px",
    top: "0",
    zIndex: 1,
  },
  verticalLine: {
    position: "absolute",
    width: "2px",
    height: "30px",
    backgroundColor: "#ccc",
    left: "-1px",
    top: "14px",
    zIndex: 0,
  },
  statusText: {
    marginLeft: "10px",
    fontSize: "14px",
  },
};
