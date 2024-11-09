import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FaBitcoin, FaEthereum, FaDashcube } from "react-icons/fa";
import { SiTether, SiLitecoin } from "react-icons/si";
import QRCode from "react-qr-code";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Deposit.css"; // Import the CSS file

export default function Deposit() {
  const [amount, setAmount] = useState();
  const [selectedCoin, setSelectedCoin] = useState("usdt");
  const walletAddresses = {
    usdt: "TXzZJNDSyxvNyLZpLvcCnAZ3D1kuWXGAE3",
    bitcoin: "bc1qfk46kuc74g2pn4n6qe3a95a07nwnc89htlaf2s",
    eth: "0x72a71744926213D261d70De73b2203c39C26aE5E",
    dash: "XpUH15JxKAbxDrkfXEENLUVvcyxLaCiHnM",
    litecoin: "ltc1q2w925mx3lmh3q5xfwhwga565gu4smv9m7xjw00",
  };
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState(null);

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
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleConfirmClick = async () => {
    const data = {
      userId: userData._id,
      name: userData.firstname,
      amount,
      type: "deposit",
    };
    try {
      await axios.post(`${BackendApi}/transaction`, data);
      toast.success("Your deposit will be confirmed");
    } catch (error) {
      toast.error("Deposit error", error);
    }
  };

  const coinIcons = {
    usdt: <SiTether className="coin-icon usdt" />,
    bitcoin: <FaBitcoin className="coin-icon bitcoin" />,
    eth: <FaEthereum className="coin-icon eth" />,
    dash: <FaDashcube className="coin-icon dash" />,
    litecoin: <SiLitecoin className="coin-icon litecoin" />,
  };

  const networkInfo = {
    usdt: "TRC20",
    bitcoin: "BTC",
    eth: "ERC20",
    dash: "Dash",
    litecoin: "Litecoin",
  };

  const amounts = [50, 100, 200, 500, 1000, 2000];

  return (
    <DashboardLayout>
      <ToastContainer />
      <div className="deposit-container">
        <section className="amount-section">
          <h1>Select Amount to Deposit</h1>
          <div className="amount-grid">
            {amounts.map((amt) => (
              <div
                key={amt}
                onClick={() => setAmount(Number(amt))}
                className={`amount-option ${amount === amt ? "selected" : ""}`}
              >
                <p>${amt}</p>
              </div>
            ))}
          </div>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="amount-input"
          />
        </section>

        <section className="coin-section">
          <h1>Select Coin to Deposit</h1>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="coin-select"
          >
            <option value="usdt">USDT (Tether)</option>
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="eth">Ethereum (ETH)</option>
            <option value="dash">Dash</option>
            <option value="litecoin">Litecoin (LTC)</option>
          </select>
        </section>

        <section className="wallet-section">
          <h2>
            {coinIcons[selectedCoin]}
            Network: {networkInfo[selectedCoin]}
          </h2>
          <QRCode
            value={walletAddresses[selectedCoin]}
            size={150}
            className="qr-code"
          />
          <p className="wallet-address">{walletAddresses[selectedCoin]}</p>
          <button className="confirm-btn" onClick={handleConfirmClick}>
            Deposit Made
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}
