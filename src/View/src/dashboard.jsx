import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Port = import.meta.env.PORT || 3001;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:${Port}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      alert("Logged out successfully.");
      console.log("Logged out");
      navigate("/api/v1/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
      alert("Logout failed. Please try again.");
    }
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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <>
      <header>
        <h1>Welcome Back, {user.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div style={{ margin: "20px 0" }}>
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            cursor: "pointer",
            border: "2px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          {user.profilePicture ? (
            <img
              src={`http://localhost:${Port}${user.profilePicture}`}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "2em", color: "#888" }}>📷</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <div>
        <h2>Details:</h2>
        <p>
          <strong>Username:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
            />
          ) : (
            user.name
          )}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
            />
          ) : (
            user.email
          )}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </div>
    </>
  );
};

export default Dashboard;
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Port = import.meta.env.PORT || 3001;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:${Port}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      alert("Logged out successfully.");
      console.log("Logged out");
      navigate("/api/v1/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
      alert("Logout failed. Please try again.");
    }
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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <>
      <header>
        <h1>Welcome Back, {user.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div style={{ margin: "20px 0" }}>
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            cursor: "pointer",
            border: "2px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          {user.profilePicture ? (
            <img
              src={`http://localhost:${Port}${user.profilePicture}`}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "2em", color: "#888" }}>📷</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <div>
        <h2>Details:</h2>
        <p>
          <strong>Username:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
            />
          ) : (
            user.name
          )}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
            />
          ) : (
            user.email
          )}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </div>
    </>
  );
};

export default Dashboard;
