import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../components/CartContext";
import dumpsData from "../components/Dumps.json"; // Import dummy data
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Dumps.css";

const Dumps = () => {
  const [accountBalance, setAccountBalance] = useState(1); // Simulated account balance
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    if (accountBalance > 50) {
      addToCart(item);
      toast.error("Item added to cart!");
    } else {
      toast.error("Insufficient balance! Please deposit more funds.");
    }
  };

  const renderTableRow = (item) => (
    <tr key={item.id} className="table-row">
      <td>{item.id}</td>
      <td>{item.type}</td>
      <td>{item.debitCredit}</td>
      <td>{item.subtype}</td>
      <td>{item.expDate}</td>
      <td>{item.billingZip}</td>
      <td>{item.code}</td>
      <td>{item.country}</td>
      <td>{item.bank}</td>
      <td>{item.base}</td>
      <td>${item.price}</td>
      <td>
        <button
          onClick={() => handleAddToCart(item)}
          style={{
            marginTop: 10,
            padding: 7,
            alignItems: "center",
            backgroundColor: "green",
            color: "white",
            border: "none",
          }}
        >
          Add to Cart{" "}
          <AiOutlineShoppingCart
            style={{ alignSelf: "center", fontSize: 12 }}
          />
        </button>
      </td>
    </tr>
  );

  const renderCard = (item) => (
    <div key={item.id} className="card">
      <p>
        <strong>S/N:</strong> {item.id}
      </p>
      <p>
        <strong>Type:</strong> {item.type}
      </p>
      <p>
        <strong>Debit/Credit:</strong> {item.debitCredit}
      </p>
      <p>
        <strong>Subtype:</strong> {item.subtype}
      </p>
      <p>
        <strong>Exp Date:</strong> {item.expDate}
      </p>
      <p>
        <strong>Billing Zip:</strong> {item.billingZip}
      </p>
      <p>
        <strong>Code:</strong> {item.code}
      </p>
      <p>
        <strong>Country:</strong> {item.country}
      </p>
      <p>
        <strong>Bank:</strong> {item.bank}
      </p>
      <p>
        <strong>Base:</strong> {item.base}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
      <button
        onClick={() => handleAddToCart(item)}
        style={{
          marginTop: 10,
          padding: 7,
          alignItems: "center",
          backgroundColor: "green",
          color: "white",
          border: "none",
        }}
      >
        Add to Cart{" "}
        <AiOutlineShoppingCart style={{ alignSelf: "center", fontSize: 12 }} />
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <ToastContainer />
      <div className="dumps-page">
        <h1 className="page-title">Dumps</h1>

        {/* Desktop Table View */}
        <div className="table-container">
          <table className="desktop-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Type (Pin)</th>
                <th>Debit/Credit</th>
                <th>Subtype</th>
                <th>Exp Date</th>
                <th>Billing Zip</th>
                <th>Code</th>
                <th>Country</th>
                <th>Bank</th>
                <th>Base</th>
                <th>Price</th>
                <th>Cart</th>
              </tr>
            </thead>
            <tbody>{dumpsData.map((item) => renderTableRow(item))}</tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="card-container">
          {dumpsData.map((item) => renderCard(item))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dumps;
