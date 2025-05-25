import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllUsersPage.css"; // Import the CSS file

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/users", {
          withCredentials: true,
        });
        console.log("Response data:", response.data);
        setUsers(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Failed to fetch users"
        );
        setUsers([]);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="users-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-container">
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h1 className="users-title">User Management</h1>
        <p className="users-subtitle">
          Total of {users.length} registered users in the system
        </p>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th className="users-th">Name</th>
            <th className="users-th">Email</th>
            <th className="users-th">Role</th>
            <th className="users-th">Created At</th>
            <th className="users-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="users-tr">
                <td className="users-td">
                  <div style={{ fontWeight: "bold" }}>
                    {`${user.firstName || ""} ${user.lastName || ""}`}
                  </div>
                </td>
                <td className="users-td">
                  <a href={`mailto:${user.email}`} className="user-email">
                    {user.email}
                  </a>
                </td>
                <td className="users-td">
                  <span
                    className={`role-badge ${
                      user.role === "System Admin"
                        ? "role-admin"
                        : user.role === "Organizer"
                        ? "role-organizer"
                        : "role-user"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="users-td">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="users-td">
                  <span
                    className={`user-status ${
                      user.isActive ? "status-active" : "status-inactive"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersPage;
