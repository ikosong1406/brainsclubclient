import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Overview from "./pages/Overview";
import Dumps from "./pages/Dumps";
import Cvv from "./pages/Cvv";
import Fullz from "./pages/Fullz";
import Orders from "./pages/Orders";
import Ticket from "./pages/Ticket";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Deposit from "./pages/Deposit";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/dumps" element={<Dumps />} />
          <Route path="/cvv" element={<Cvv />} />
          <Route path="/fullz" element={<Fullz />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/deposit" element={<Deposit />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
