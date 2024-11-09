import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import "../styles/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const userData = {
      firstname,
      lastname,
      email,
      password,
      role: "user",
    };

    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${BackendApi}/register`, userData);
      if (response.data.status === "ok") {
        toast.success(response.data.data);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsChecked(false);
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.data);
      } else {
        toast.error("Registration error");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="registerDiv1">
      <ToastContainer />
      <div className="registerDiv2">
        <div className="loginDiv2b">
          <div className="registerDiv21">
            <h1>Welcome</h1>
            <h3>
              Please Enter the information you would love to register with
            </h3>
          </div>
          <div className="registerDiv22">
            <h3>Firstname</h3>
            <div className="password-input-container">
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <h3>Lastname</h3>
            <div className="password-input-container">
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
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
            <h3>Confirm Password</h3>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={handleConfirmPasswordToggle}
                className="password-toggle-icon"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                width: "100%",
              }}
            >
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ width: 20 }}
              />
              <h3>
                I agree to the{" "}
                <a
                  href="/termsofuse"
                  style={{ textDecoration: "none", color: "#0038a8" }}
                >
                  terms and conditions
                </a>
              </h3>
            </div>
            <button
              type="submit"
              className="registerBtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <h3>Creating Account.....</h3> : <h3>Register</h3>}
            </button>
          </div>
          <div className="registerDiv23">
            <hr />
            <h4>or</h4>
            <hr />
          </div>
          <div className="registerDiv24">
            <h3>
              Already have an account?{" "}
              <span>
                <Link
                  style={{ textDecoration: "none", color: "#0038a8" }}
                  to="/"
                >
                  Login
                </Link>
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
