import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function NewShipment() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    size: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "shipments"), {
        ...form,
        userId: user.uid,
        createdAt: Timestamp.now(),
        status: "Processing",
      });

      alert(`✅ Shipment created successfully!\n🆔 Track ID: ${docRef.id}`);

      setForm({ sender: "", receiver: "", size: "", address: "" });
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create New Shipment</h2>

        <input
          placeholder="Sender Name"
          value={form.sender}
          onChange={(e) => setForm({ ...form, sender: e.target.value })}
          required
          style={styles.input}
        />

        <input
          placeholder="Receiver Name"
          value={form.receiver}
          onChange={(e) => setForm({ ...form, receiver: e.target.value })}
          required
          style={styles.input}
        />

        <select
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
          required
          style={{ ...styles.input, appearance: "none" }}
        >
          <option value="">Select Package Size</option>
          <option value="Extra Small">Extra Small</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Extra Large">Extra Large</option>
        </select>

        <input
          placeholder="Delivery Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Create Shipment</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor:"#f0fff4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  form: {
    backgroundColor:"#f0fff4",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "450px",
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
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
