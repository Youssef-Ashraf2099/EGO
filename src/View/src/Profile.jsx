import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext"; // <-- Import AuthContext
import "./Profile.css";
const Port = import.meta.env.VITE_API_PORT || 4000;
import { handleLogout } from "./authHandlers";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { fetchProfile } = useAuth(); // <-- Use fetchProfile instead of setRole

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:${Port}/api/v1/users/profile`,
          {
            withCredentials: true,
          }
        );

        if (!res.data || typeof res.data !== "object" || !res.data.email) {
          throw new Error("Invalid user data received");
        }

        setUser(res.data);
        setEditData({ name: res.data.name, email: res.data.email });
        console.log("User details fetched:", res.data);
      } catch (error) {
        console.error("Error while fetching user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:${Port}/api/v1/users/profile`, editData, {
          withCredentials: true,
        })
        .then(() => {
          setUser((prev) => ({ ...prev, ...editData }));
          setIsEditing(false);
          console.log("User details updated:", editData);
          alert("Changes saved successfully.");
        })
        .catch((err) => {
          console.error("Failed to update user:", err);
          alert("Failed to save changes.");
        });
    } else {
      setIsEditing(true);
    }
  };

  // Replace the old handleLogout with this:
  const onLogout = async () => {
    await handleLogout({ fetchProfile, navigate, Port });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const res = await axios.put(
        `http://localhost:${Port}/api/v1/profile-picture`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser((prev) => ({ ...prev, profilePicture: res.data.profilePicture }));
      alert("Profile picture updated.");
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      alert("Upload failed. Please try again.");
    }
  };

  if (loading) return <div className="loader"></div>;
  if (!user) return <div className="not-found">User not found.</div>;

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">
          <h2>EGO</h2>
        </div>
        {/* <nav className="nav-menu">
          <ul>
            <li className="active">
              <span className="icon">🏠</span> Dashboard
            </li>
            <li>
              <span className="icon">👤</span> Profile
            </li>
            <li>
              <span className="icon">⚙️</span> Settings
            </li>
            <li onClick={handleLogout}>
              <span className="icon">🚪</span> Logout
            </li>
          </ul>
        </nav> */}
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome Back, {user.name}</h1>
          <div className="user-badge">
            <div className="profile-pic-small">
              {user.profilePicture ? (
                <img
                  src={`http://localhost:${Port}${user.profilePicture}`}
                  alt="Profile"
                />
              ) : (
                <span>👤</span>
              )}
            </div>
            <span>{user.name}</span>
          </div>
        </header>

        <div className="profile-section">
          <div className="profile-card">
            <div
              className="profile-picture"
              onClick={() => fileInputRef.current.click()}
            >
              {user.profilePicture ? (
                <img
                  src={`http://localhost:${Port}${user.profilePicture}`}
                  alt="Profile"
                />
              ) : (
                <div className="no-profile">
                  <span>📷</span>
                  <p>Upload Photo</p>
                </div>
              )}
              <div className="overlay">
                <span>Change</span>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <div className="user-details">
              <h2>Your Profile</h2>
              <div className="detail-row">
                <div className="detail-label">Username:</div>
                <div className="detail-value">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    user.name
                  )}
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Email:</div>
                <div className="detail-value">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    user.email
                  )}
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Role:</div>
                <div className="detail-value">{user.role}</div>
              </div>
              <button
                className={`edit-button ${isEditing ? "save" : ""}`}
                onClick={handleEditClick}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>

              <button className="logout-button" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
