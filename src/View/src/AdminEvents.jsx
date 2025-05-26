import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Port = import.meta.env.VITE_API_PORT || 3040;
import "./AdminEvents.css";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${Port}/api/v1/events/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const handleEdit = (eventId) => {
    navigate(`/admin/edit-event/${eventId}`);
  };
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:${Port}/api/v1/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  const handleApprove = async (eventId) => {
    try {
      await axios.put(
        `http://localhost:${Port}/api/v1/events/${eventId}`,
        {
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEvents(
        events.map((event) =>
          event._id === eventId ? { ...event, status: "approved" } : event
        )
      );
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };
  const handleReject = async (eventId) => {
    try {
      await axios.put(
        `http://localhost:${Port}/api/v1/events/${eventId}`,
        {
          status: "rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEvents(
        events.map((event) =>
          event._id === eventId ? { ...event, status: "rejected" } : event
        )
      );
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };
  if (loading) {
    return <div className="admin-events-loading">Loading...</div>;
  }

  return (
    <div className="admin-events-container">
      <h1>Admin Events</h1>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Organizer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.organizer?.name || "Unknown organizer"}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td className={`status-${event.status}`}>{event.status}</td>
              <td>
                {event.status === "pending" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(event._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(event._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {event.status === "approved" && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminEvents;
