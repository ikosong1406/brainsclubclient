import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardLayout.css"; // Link to CSS file
import { FaShoppingCart } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPath = window.location.pathname; // Get current path for active link styling

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-logo">
          {/* <img src={logo} alt="Logo" width={30} height={30} /> */}
          <h1>Brainsclub</h1>
        </div>
        <div className="header-user">
          <FaShoppingCart className="icon" onClick={() => navigate("/cart")} />
          <button
            className="menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar for desktop view */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <nav className="nav-links">
            <span
              onClick={() => navigate("/overview")}
              className={`nav-item ${
                currentPath === "/overview" ? "active" : ""
              }`}
            >
              <span>Overview</span>
            </span>
            <span
              onClick={() => navigate("/deposit")}
              className={`nav-item ${
                currentPath === "/deposit" ? "active" : ""
              }`}
            >
              <span>Deposit</span>
            </span>
            <span
              onClick={() => navigate("/dumps")}
              className={`nav-item ${currentPath === "/dumps" ? "active" : ""}`}
            >
              <span>Dumps</span>
            </span>
            <span
              onClick={() => navigate("/cvv")}
              className={`nav-item ${currentPath === "/cvv" ? "active" : ""}`}
            >
              <span>CVV2</span>
            </span>
            {/* <span
              onClick={() => navigate("/fullz")}
              className={`nav-item ${currentPath === "/fullz" ? "active" : ""}`}
            >
              <span>Fullz</span>
            </span> */}
            <span
              onClick={() => navigate("/orders")}
              className={`nav-item ${
                currentPath === "/orders" ? "active" : ""
              }`}
            >
              <span>Orders</span>
            </span>
            <span
              onClick={() => navigate("/ticket")}
              className={`nav-item ${
                currentPath === "/ticket" ? "active" : ""
              }`}
            >
              <span>Ticket</span>
            </span>
            <span
              onClick={() => navigate("/transaction")}
              className={`nav-item ${
                currentPath === "/transaction" ? "active" : ""
              }`}
            >
              <span>Transaction History</span>
            </span>
            <span
              onClick={() => navigate("/profile")}
              className={`nav-item ${
                currentPath === "/profile" ? "active" : ""
              }`}
            >
              <span>Profile</span>
            </span>
          </nav>
        </aside>

        {/* Main content */}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
