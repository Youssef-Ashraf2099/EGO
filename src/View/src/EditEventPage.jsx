import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "./axiosURL";
// Import the CSS file
import "./main page/styles/EditEventPage.css";
// Authentication imports kept but not used for now
// import { isAuthenticated, hasRole, getAuthToken } from '../utils/auth';

const Port = import.meta.env.VITE_API_PORT || 3500;

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Add state for delete confirmation dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Image state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    ticketPrice: "",
    ticketAvailable: "",
  });

  useEffect(() => {
    // Authentication check removed

    // Fetch event data
    const fetchEvent = async () => {
      try {
        // Use full URL with port for direct access
        const response = await axiosInstance.get(`/events/${id}`);

        setEvent(response.data);

        // Format date for the input field with error handling
        let formattedDate = "";
        try {
          if (response.data.date) {
            const eventDate = new Date(response.data.date);
            formattedDate = eventDate.toISOString().split("T")[0];
          } else {
            formattedDate = new Date().toISOString().split("T")[0];
          }
        } catch (dateError) {
          console.error("Error parsing date:", dateError);
          formattedDate = new Date().toISOString().split("T")[0];
        }

        setFormData({
          title: response.data.title || "",
          description: response.data.description || "",
          date: formattedDate,
          location: response.data.location || "",
          category: response.data.category || "",
          ticketPrice: response.data.ticketPrice || "",
          ticketAvailable: response.data.ticketAvailable || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event data");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a FormData object for multipart/form-data
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Add image if a new one was selected
      if (file) {
        formDataToSend.append("image", file);
      }

      // console.log(
      //   "Sending update to:",
      //   `/events/${id}`
      // );

      // Log form data entries
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      await axiosInstance.put(`/events/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event ID:", id);
      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
      console.error("Response:", error.response);
      setError(
        "Failed to update event: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Add handler for deleting an event
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/events/${id}`);
      navigate("/"); // Navigate to home page after successful deletion
    } catch (error) {
      console.error("Error deleting event:", error);
      setError(
        "Failed to delete event: " +
          (error.response?.data?.error || error.message)
      );
      setShowDeleteConfirm(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading && !event) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-event-container">
      <h2>Edit Event</h2>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-dialog">
            <h3>Delete Event</h3>
            <p>Are you sure you want to delete this event?</p>
            <div className="delete-confirm-buttons">
              <button
                className="confirm-yes-btn"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Yes"}
              </button>
              <button
                className="confirm-cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ticketPrice">Ticket Price</label>
          <input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ticketAvailable">Available Tickets</label>
          <input
            type="number"
            id="ticketAvailable"
            name="ticketAvailable"
            value={formData.ticketAvailable}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Event Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
          />
          {preview && (
            <div className="image-preview">
              <p>New image preview:</p>
              <img
                src={getImageUrl(preview)}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
          {event?.image && !preview && (
            <div className="current-image">
              <p>Current image:</p>
              <img
                src={`${event.image.startsWith("http") ? "" : "/"}${
                  event.image
                }`}
                alt="Current"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
        </div>

        <div className="button-group">
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/events/${id}`)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventPage;
