import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import BackendApi from "../components/BackendApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BackendApi}/orders`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <DashboardLayout>
      <div className="orders-container">
        <h1 style={{ fontSize: 18 }}>Your Orders</h1>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <p>Order ID: {order.id}</p>
                <p>Amount: ${order.amount}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Orders;
