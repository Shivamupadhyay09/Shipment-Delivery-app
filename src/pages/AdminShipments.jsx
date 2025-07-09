import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllShipments = async () => {
      try {
        const snapshot = await getDocs(collection(db, "shipments"));
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

    fetchAllShipments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const shipmentRef = doc(db, "shipments", id);
      await updateDoc(shipmentRef, { status: newStatus });
      setShipments((prev) =>
        prev.map((shipment) =>
          shipment.id === id ? { ...shipment, status: newStatus } : shipment
        )
      );
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  if (loading) return <p style={styles.loading}>Loading shipments...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛠 Admin Panel - Manage Shipments</h2>
      <div style={styles.grid}>
        {shipments.map((s) => (
          <div key={s.id} style={styles.card}>
            <p><strong>Tracking ID:</strong> {s.id}</p>
            <p><strong>From:</strong> {s.sender}</p>
            <p><strong>To:</strong> {s.receiver}</p>
            <p><strong>Size:</strong> {s.size}</p>
            <p><strong>Address:</strong> {s.address}</p>

            <label>
              <strong>Status:</strong>{" "}
              <select
                value={s.status}
                onChange={(e) => handleStatusChange(s.id, e.target.value)}
                style={styles.select}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "25px",
    color: "#0d6efd",
  },
  loading: {
    fontSize: "18px",
    textAlign: "center",
    marginTop: "60px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    marginTop: "5px",
  },
};
