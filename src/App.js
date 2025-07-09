import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewShipment from "./pages/NewShipment";
import MyShipments from "./pages/MyShipments";
import TrackShipment from "./pages/TrackShipment"; 
import AdminShipments from "./pages/AdminShipments"; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-shipment" element={<NewShipment />} />
        <Route path="/my-shipments" element={<MyShipments />} />
        <Route path="/track-shipment" element={<TrackShipment />} />
        <Route path="/admin" element={<AdminShipments />} /> 
      </Routes>
    </>
  );
}

export default App;
