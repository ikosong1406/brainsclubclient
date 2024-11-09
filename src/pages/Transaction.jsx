import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";
import "../styles/Transaction.css";

export default function Transaction() {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = await getUserToken();
        setToken(userToken);
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.post(`${BackendApi}/userdata`, { token });
      setUserData(response.data.data);
      setTransactions(response.data.data.transactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        getData();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <DashboardLayout>
      <h1 className="transaction-title">Transaction History</h1>

      <div className="transaction-container">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="loading-text">No transactions</p>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={index}
              className={`transaction-card ${
                transaction.type === "deposit" ? "border-green" : "border-red"
              }`}
            >
              <div className="transaction-details">
                {transaction.type === "deposit" ? (
                  <FaArrowDown className="transaction-icon green" />
                ) : (
                  <FaArrowUp className="transaction-icon red" />
                )}
                <div>
                  <h2 className="transaction-type">{transaction.type}</h2>
                  <p className="transaction-date">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="transaction-amount">
                <p
                  className={`amount-value ${
                    transaction.type === "deposit" ? "text-green" : "text-red"
                  }`}
                >
                  ${transaction.amount}
                </p>
                <p
                  className={`status ${
                    transaction.status === "confirmed" ? "confirmed" : "pending"
                  }`}
                >
                  {transaction.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
