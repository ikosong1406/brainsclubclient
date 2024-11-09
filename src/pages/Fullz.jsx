import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../components/CartContext";

const Fullz = () => {
  const [accountBalance, setAccountBalance] = useState(10);
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const fullzData = [
    {
      id: 1,
      name: "John Doe",
      cityZipCountry: "Los Angeles, CA 90210, US",
      fullAddress: "123 Beverly Hills, Los Angeles, CA 90210, US",
      phone: "(123) 456-7890",
      email: "john.doe@example.com",
      rentOwn: "Yes",
      yearsResidence: "5",
      incomeType: "Salary",
      employer: "TechCorp",
      occupation: "Software Engineer",
      yearsEmployed: "3",
      workPhone: "(123) 555-7890",
      netIncome: "$5,000",
      creditReport: "Good",
      creditCard: "Visa - 4111 xxxx xxxx 1234",
      checkingAccount: "Yes",
      ssn: "123-45-6789",
      dob: "01/01/1980",
      mmn: "Smith",
      driversLicense: "D12345678",
      account: "0987654321",
      routing: "123456789",
      base: "70%",
      price: 50,
    },
    // Add more dummy data as needed
  ];

  const renderTableRow = (item) => (
    <tr key={item.id} className="table-row">
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.cityZipCountry}</td>
      <td>{item.fullAddress}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.rentOwn}</td>
      <td>{item.yearsResidence}</td>
      <td>{item.incomeType}</td>
      <td>{item.employer}</td>
      <td>{item.occupation}</td>
      <td>{item.yearsEmployed}</td>
      <td>{item.workPhone}</td>
      <td>{item.netIncome}</td>
      <td>{item.creditReport}</td>
      <td>{item.creditCard}</td>
      <td>{item.checkingAccount}</td>
      <td>{item.ssn}</td>
      <td>{item.dob}</td>
      <td>{item.mmn}</td>
      <td>{item.driversLicense}</td>
      <td>{item.account}</td>
      <td>{item.routing}</td>
      <td>{item.base}</td>
      <td>${item.price}</td>
      <td>
        <button onClick={() => handleAddToCart(item)}>
          Add to Cart <AiOutlineShoppingCart />
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
        <strong>Name:</strong> {item.name}
      </p>
      <p>
        <strong>City/Zip/Country:</strong> {item.cityZipCountry}
      </p>
      <p>
        <strong>Full Address:</strong> {item.fullAddress}
      </p>
      <p>
        <strong>Phone:</strong> {item.phone}
      </p>
      <p>
        <strong>Email:</strong> {item.email}
      </p>
      <p>
        <strong>Rent/Own:</strong> {item.rentOwn}
      </p>
      <p>
        <strong>Years of Residence:</strong> {item.yearsResidence}
      </p>
      <p>
        <strong>Income Type:</strong> {item.incomeType}
      </p>
      <p>
        <strong>Employer:</strong> {item.employer}
      </p>
      <p>
        <strong>Occupation:</strong> {item.occupation}
      </p>
      <p>
        <strong>Years Employed:</strong> {item.yearsEmployed}
      </p>
      <p>
        <strong>Work Phone:</strong> {item.workPhone}
      </p>
      <p>
        <strong>Net Monthly Income:</strong> {item.netIncome}
      </p>
      <p>
        <strong>Credit Report:</strong> {item.creditReport}
      </p>
      <p>
        <strong>Credit Card:</strong> {item.creditCard}
      </p>
      <p>
        <strong>Checking Account:</strong> {item.checkingAccount}
      </p>
      <p>
        <strong>SSN:</strong> {item.ssn}
      </p>
      <p>
        <strong>DOB:</strong> {item.dob}
      </p>
      <p>
        <strong>MMN:</strong> {item.mmn}
      </p>
      <p>
        <strong>Driver's License:</strong> {item.driversLicense}
      </p>
      <p>
        <strong>Account:</strong> {item.account}
      </p>
      <p>
        <strong>Routing:</strong> {item.routing}
      </p>
      <p>
        <strong>Base:</strong> {item.base}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
      <button onClick={() => handleAddToCart(item)}>
        Add to Cart <AiOutlineShoppingCart />
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="fullz-page">
        <h1 className="page-title">Fullz</h1>

        {/* Desktop Table View */}
        <div className="table-container">
          <table className="desktop-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>City/Zip/Country</th>
                <th>Full Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Rent/Own</th>
                <th>Years of Residence</th>
                <th>Income Type</th>
                <th>Employer</th>
                <th>Occupation</th>
                <th>Years Employed</th>
                <th>Work Phone</th>
                <th>Net Income</th>
                <th>Credit Report</th>
                <th>Credit Card</th>
                <th>Checking Account</th>
                <th>SSN</th>
                <th>DOB</th>
                <th>MMN</th>
                <th>Driver's License</th>
                <th>Account</th>
                <th>Routing</th>
                <th>Base</th>
                <th>Price</th>
                <th>Cart</th>
              </tr>
            </thead>
            <tbody>{fullzData.map((item) => renderTableRow(item))}</tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="card-container">
          {fullzData.map((item) => renderCard(item))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Fullz;
