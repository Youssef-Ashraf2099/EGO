import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Port = import.meta.env.PORT || 3001;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:${Port}/api/v1/users/profile`, {
          withCredentials: true,
        });

        // Check if user data is valid
        if (!res.data || typeof res.data !== 'object' || !res.data.email) {
          throw new Error("Invalid user data received");
        }

        setUser(res.data);
        setEditData({ name: res.data.name, email: res.data.email });
        console.log("User details fetched:", res.data);
      } catch (error) {
        console.error("Error while fetching user:", error.message);
        // navigate('/api/v1/login');
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
      // Save changes
      axios.put(`http://localhost:${Port}/api/v1/users/profile`, editData, {
        withCredentials: true,
      })
        .then(() => {
          setUser((prev) => ({ ...prev, ...editData }));
          setIsEditing(false);
          console.log("User details updated:", editData);
          alert('Changes saved successfully.');
        })
        .catch((err) => {
          console.error('Failed to update user:', err);
          alert('Failed to save changes.');
        });
    } else {
      setIsEditing(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <>
      <header>
        <h1>Welcome Back, {user.name}</h1>
      </header>

      <div>
        <h2>Details:</h2>
        <p>
          <strong>Username:</strong>{' '}
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
          <strong>Email:</strong>{' '}
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
        <p><strong>Role:</strong> {user.role}</p>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </div>
    </>
  );
};

export default Dashboard;
