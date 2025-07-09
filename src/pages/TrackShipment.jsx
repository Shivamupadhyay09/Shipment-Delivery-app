import { useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function TrackShipment() {
  const [shipmentId, setShipmentId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setShipment(null);
    setLoading(true);

    try {
      const ref = doc(db, "shipments", shipmentId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setShipment(snap.data());
      } else {
        setError("❌ No shipment found with that ID.");
      }
    } catch (err) {
      setError("❌ Error fetching shipment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleTrack} style={styles.form}>
        <h2 style={styles.title}>📦 Track Shipment</h2>
        <input
          type="text"
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
          placeholder="Enter Shipment ID"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Track
        </button>
      </form>

      {loading && <p>🔄 Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {shipment && (
        <div style={styles.result}>
          <h3>Status: {shipment.status}</h3>
          <p><strong>From:</strong> {shipment.sender}</p>
          <p><strong>To:</strong> {shipment.receiver}</p>
          <p><strong>Size:</strong> {shipment.size}</p>
          <p><strong>Address:</strong> {shipment.address}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  form: {
    marginBottom: "30px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  input: {
    padding: "10px",
    width: "300px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#198754",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  result: {
    marginTop: "30px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
    display: "inline-block",
    textAlign: "left",
  },
  error: {
    color: "red",
  },
};
