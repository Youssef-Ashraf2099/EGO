import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllUsersPage.css"; // Import the CSS file

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [updatingRole, setUpdatingRole] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleDeleteUser = async (userId) => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/v1/users/${userId}`, {
        withCredentials: true,
      });

      // Update users list after deletion
      setUsers(users.filter((user) => user._id !== userId));

      // Clear confirmation dialog
      setDeleteConfirm(null);
      setDeleteLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to delete user"
      );
      setDeleteLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!editingUser) return;

    try {
      setUpdatingRole(true);
      // Updated endpoint to match the router configuration
      const response = await axios.put(
        `/api/v1/users/${editingUser.id}`,
        { role: editingUser.newRole },
        { withCredentials: true }
      );

      // Update the users array with the updated user
      setUsers(
        users.map((user) =>
          user._id === editingUser.id
            ? { ...user, role: editingUser.newRole }
            : user
        )
      );

      // Clear editing state
      setEditingUser(null);
      setUpdatingRole(false);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to update user role"
      );
      setUpdatingRole(false);
    }
  };
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
          <button
            className="retry-button"
            onClick={() => {
              setError(null);
              fetchUsers();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      {deleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h3>Confirm User Deletion</h3>
            <p>
              Are you sure you want to delete the user{" "}
              <strong>{deleteConfirm.name}</strong>?
            </p>
            <p className="delete-warning">This action cannot be undone!</p>

            <div className="delete-actions">
              <button
                className="cancel-button"
                onClick={() => setDeleteConfirm(null)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(deleteConfirm.id)}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <span>
                    <div className="delete-spinner"></div>
                    Deleting...
                  </span>
                ) : (
                  "Delete User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="edit-role-overlay">
          <div className="edit-role-modal">
            <h3>Update User Role</h3>
            <p>
              Change role for user <strong>{editingUser.name}</strong>
            </p>

            <div className="role-select-container">
              <label htmlFor="role-select">Select new role:</label>
              <select
                id="role-select"
                className="role-select"
                value={editingUser.newRole}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, newRole: e.target.value })
                }
              >
                <option value="Standard User">Standard User</option>
                <option value="Organizer">Organizer</option>
                <option value="System Admin">System Admin</option>
              </select>
            </div>

            <div className="edit-actions">
              <button
                className="cancel-button"
                onClick={() => setEditingUser(null)}
                disabled={updatingRole}
              >
                Cancel
              </button>
              <button
                className="save-button"
                onClick={handleUpdateRole}
                disabled={
                  updatingRole ||
                  editingUser.currentRole === editingUser.newRole
                }
              >
                {updatingRole ? (
                  <span>
                    <div className="update-spinner"></div>
                    Updating...
                  </span>
                ) : (
                  "Update Role"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
            <th className="users-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="users-tr">
                <td className="users-td">
                  <div style={{ fontWeight: "bold" }}>
                    {`${user.name || ""}`}
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
                <td className="users-td action-cell">
                  <div className="action-buttons">
                    <button
                      className="edit-role-btn"
                      onClick={() =>
                        setEditingUser({
                          id: user._id,
                          name:
                            `${user.firstName || ""} ${
                              user.lastName || ""
                            }`.trim() || user.email,
                          currentRole: user.role,
                          newRole: user.role,
                        })
                      }
                    >
                      Edit Role
                    </button>
                    <button
                      className="delete-user-btn"
                      onClick={() =>
                        setDeleteConfirm({
                          id: user._id,
                          name:
                            `${user.firstName || ""} ${
                              user.lastName || ""
                            }`.trim() || user.email,
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
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
