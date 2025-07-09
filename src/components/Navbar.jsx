import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate(); 

  const handleMouseEnter = (name) => setHoveredLink(name);
  const handleMouseLeave = () => setHoveredLink(null);

  const getLinkStyle = (name) => ({
    ...styles.link,
    color: hoveredLink === name ? "#0d6efd" : "white",
  });

  const handleLogout = async () => {
    await logout();    
    navigate("/");      
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link
          to="/"
          style={getLinkStyle("home")}
          onMouseEnter={() => handleMouseEnter("home")}
          onMouseLeave={handleMouseLeave}
        >
          🚚 SwiftShip
        </Link>
      </div>

      <div style={styles.menu}>
        {user && (
          <>
            <Link
              to="/new-shipment"
              style={getLinkStyle("new-shipment")}
              onMouseEnter={() => handleMouseEnter("new-shipment")}
              onMouseLeave={handleMouseLeave}
            >
              New Shipment
            </Link>
            <Link
              to="/my-shipments"
              style={getLinkStyle("my-shipments")}
              onMouseEnter={() => handleMouseEnter("my-shipments")}
              onMouseLeave={handleMouseLeave}
            >
              My Shipments
            </Link>
            <Link
              to="/track-shipment"
              style={getLinkStyle("track-shipment")}
              onMouseEnter={() => handleMouseEnter("track-shipment")}
              onMouseLeave={handleMouseLeave}
            >
              Track Shipment
            </Link>

            {user?.email === "test11@gmail.com" && (
              <Link
                to="/admin"
                style={getLinkStyle("admin")}
                onMouseEnter={() => handleMouseEnter("admin")}
                onMouseLeave={handleMouseLeave}
              >
                Admin Panel
              </Link>
            )}
          </>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={getLinkStyle("login")}
              onMouseEnter={() => handleMouseEnter("login")}
              onMouseLeave={handleMouseLeave}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={getLinkStyle("register")}
              onMouseEnter={() => handleMouseEnter("register")}
              onMouseLeave={handleMouseLeave}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 60px",
    backgroundColor: "#000000",
    color: "white",
    fontFamily: "Arial, sans-serif",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
    padding: "4px 8px",
    transition: "color 0.3s ease",
  },
  button: {
    padding: "6px 14px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
};
