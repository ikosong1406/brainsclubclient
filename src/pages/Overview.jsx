import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  FaArrowDown,
  FaArrowUp,
  FaWallet,
  FaChartLine,
  FaCoins,
} from "react-icons/fa";
import DashboardLayout from "../components/DashboardLayout";
import { getUserToken } from "../components/storage";
import BackendApi from "../components/BackendApi";
import "../styles/Overview.css"; // Import the CSS file

export default function Overview() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    totalBalance: 0,
    totalInvestment: 0,
    transactions: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(new Date());
    const timer = setInterval(updateCurrentTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchData = async () => {
    try {
      const userToken = await getUserToken();
      setToken(userToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.post(`${BackendApi}/userdata`, { token });
      const fetchedData = response.data.data;
      setUserData({
        firstname: fetchedData.firstname || "",
        lastname: fetchedData.lastname || "",
        totalBalance: fetchedData.totalBalance || 0,
        totalInvestment: fetchedData.totalInvestment || 0,
        totalReturn: fetchedData.totalReturn || 0,
        transactions: fetchedData.transactions || [],
        portfolio: fetchedData.portfolio || [],
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) getData();
  }, [token]);

  return (
    <DashboardLayout>
      <div className="overview-container">
        {/* Greeting and Date Section */}
        <div className="greeting-section">
          <h1 className="greeting">
            {greeting()}, {userData.firstname}
          </h1>
          <p className="date">
            {moment(currentTime).format("dddd, MMMM D, YYYY")}
          </p>
        </div>

        {/* Cards Section */}
        <div className="cards-container">
          {/* Total Balance Card */}
          <div className="card">
            <FaWallet className="card-icon blue-icon" />
            <div className="card-content">
              <p className="card-label">Total Balance</p>
              <h2 className="card-value">${userData.totalBalance}</h2>
            </div>
          </div>

          {/* Total Investment Card */}
          <div className="card">
            <FaChartLine className="card-icon green-icon" />
            <div className="card-content">
              <p className="card-label">Total Order</p>
              <h2 className="card-value">${userData.totalInvestment}</h2>
            </div>
          </div>
        </div>

        {/* Transactions and Portfolio Section */}
        <div className="details-container">
          {/* Transactions */}
          <div className="transactions">
            <h2 className="section-title">Recent Transactions</h2>
            <div className="transactions-list">
              {userData.transactions.slice(0, 3).map((transaction, index) => (
                <div
                  key={index}
                  className={`transaction-card ${transaction.type}`}
                >
                  <div className="transaction-info">
                    {transaction.type === "deposit" ? (
                      <FaArrowDown className="transaction-icon green-icon" />
                    ) : (
                      <FaArrowUp className="transaction-icon red-icon" />
                    )}
                    <div>
                      <h3 className="transaction-type">{transaction.type}</h3>
                      <p className="transaction-date">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <p className={`amount ${transaction.type}`}>
                      ${transaction.amount}
                    </p>
                    <p className={`status ${transaction.status}`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
              {userData.transactions.length === 0 && (
                <p className="no-transactions">No transactions available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
