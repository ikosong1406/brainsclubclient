import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storeUserToken } from "../components/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackendApi from "../components/BackendApi";
import "../styles/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false); // Stop loading if email is invalid
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${BackendApi}/login`, userData);
      const { token, role, status, message } = response.data;

      storeUserToken(token);
      toast.success(message);
      setLoading(false);

      navigate("/overview");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.data);
      } else {
        toast.error("Login error");
      }
      setLoading(false);
    }
  };

  return (
    <div className="loginDiv1">
      <ToastContainer />
      <div className="loginDiv2">
        <div className="loginDiv2b">
          <div className="loginDiv21">
            <h1>Welcome back</h1>
            <h3>Enter the information you entered while registering</h3>
          </div>
          <div className="loginDiv22">
            <h3>Email</h3>
            <div className="password-input-container">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <h3>Password</h3>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={handlePasswordToggle}
                className="password-toggle-icon"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <h4>Forgot Password ?</h4>
            <button
              className="loginBtn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <h3>Authenticatin Details....</h3> : <h3>Login</h3>}
            </button>
          </div>
          <div className="loginDiv23">
            <hr />
            <h4>or</h4>
            <hr />
          </div>
          <div className="loginDiv24">
            <h3>
              Don't have an account ?{" "}
              <span>
                <Link
                  style={{ textDecoration: "none", color: "#0038a8" }}
                  to="/register"
                >
                  Sign up
                </Link>
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
