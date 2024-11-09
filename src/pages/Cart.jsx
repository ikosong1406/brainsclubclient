// pages/Cart.js
import React from "react";
import { useCart } from "../components/CartContext";
import DashboardLayout from "../components/DashboardLayout";
// import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <DashboardLayout>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Price:</strong> ${item.price}
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Cart;
