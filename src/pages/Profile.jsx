import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";
import { FaCheckCircle } from "react-icons/fa"; // Icon for verified status
import "../styles/Profile.css";

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
    const data = { token };
    try {
      const response = await axios.post(`${BackendApi}/userdata`, data);
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

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password successfully changed!");
  };

  return (
    <DashboardLayout>
      <h1 className="profile-title">Profile</h1>
      <div className="profile-container">
        {/* Profile form */}
        <div className="profile-form">
          <input
            type="text"
            placeholder={userData.firstname || "First Name"}
            className="profile-input"
            defaultValue={userData.firstname}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.lastname || "Last Name"}
            className="profile-input"
            defaultValue={userData.lastname}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
          <input
            type="email"
            placeholder={userData.email || "Email"}
            className="profile-input"
            defaultValue={userData.email}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.gender || "Gender"}
            className="profile-input"
            defaultValue={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.phone || "Phone Number"}
            className="profile-input"
            defaultValue={userData.phone}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.country || "Country"}
            className="profile-input"
            defaultValue={userData.country}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, country: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="New Password"
            className="profile-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="profile-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Change Password Button */}
        <button className="save-button" onClick={handleChangePassword}>
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
