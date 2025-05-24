import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CSS styles object
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      marginBottom: "30px",
      borderBottom: "2px solid #eaeaea",
      paddingBottom: "15px",
    },
    title: {
      color: "#333",
      fontSize: "28px",
      marginBottom: "10px",
    },
    subtitle: {
      color: "#666",
      fontSize: "16px",
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "300px",
      fontSize: "18px",
      color: "#666",
    },
    spinner: {
      border: "4px solid rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #3498db",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      animation: "spin 1s linear infinite",
      marginRight: "10px",
    },
    error: {
      padding: "20px",
      backgroundColor: "#ffebee",
      color: "#d32f2f",
      borderRadius: "4px",
      border: "1px solid #ffcdd2",
      margin: "20px 0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      borderRadius: "5px",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#f5f5f5",
      color: "#333",
      fontWeight: "bold",
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #ddd",
    },
    tr: {
      transition: "background-color 0.3s",
    },
    trHover: {
      backgroundColor: "#f9f9f9",
    },
    active: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
      padding: "5px 10px",
      borderRadius: "4px",
      fontWeight: "bold",
      display: "inline-block",
    },
    inactive: {
      backgroundColor: "#ffebee",
      color: "#c62828",
      padding: "5px 10px",
      borderRadius: "4px",
      fontWeight: "bold",
      display: "inline-block",
    },
  };

useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/v1/users", {
        withCredentials: true,
      });
      console.log("Response data:", response.data);
      // Ensure users is always an array
      setUsers(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to fetch users"
      );
      setUsers([]); // fallback to empty array on error
      setLoading(false);
    }
  };

  fetchUsers();
  console.log("Users fetched:", users);
}, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <span>Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User Management</h1>
        <p style={styles.subtitle}>
          Total of {users.length} registered users in the system
        </p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Created At</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                style={styles.tr}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                <td style={styles.td}>
                  <div style={{ fontWeight: "bold" }}>
                    {`${user.firstName || ""} ${user.lastName || ""}`}
                  </div>
                </td>
                <td style={styles.td}>
                  <a
                    href={`mailto:${user.email}`}
                    style={{ color: "#1976d2", textDecoration: "none" }}
                  >
                    {user.email}
                  </a>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      backgroundColor:
                        user.role === "System Admin"
                          ? "#e3f2fd"
                          : user.role === "Organizer"
                          ? "#fff8e1"
                          : "#f1f8e9",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td style={styles.td}>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td style={styles.td}>
                  <span style={user.isActive ? styles.active : styles.inactive}>
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

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AllUsersPage;
