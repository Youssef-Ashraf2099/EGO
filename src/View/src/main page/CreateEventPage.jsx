import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/CreateEventPage.css";
import { useAuth } from "../context/AuthContext";

const Port = import.meta.env.VITE_API_PORT || 3500;

function CreateEventPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, loading: authLoading } = useAuth(); // Get user from auth context

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    ticketPrice: "",
    ticketAvailable: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Check if user is organizer and redirect if not
  useEffect(() => {
    if (!authLoading) {
      if (!user && user.role !== "Organizer") {
        setError("Only organizers can create events");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if user is authenticated and has organizer role
    if (!user) {
      setError("You must be logged in to create events");
      setLoading(false);
      return;
    }

    if (user.role !== "Organizer") {
      setError("Only organizers can create events");
      setLoading(false);
      return;
    }

    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.date.trim()) errors.date = "Date is required";
    if (!formData.time.trim()) errors.time = "Time is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (!formData.ticketPrice.trim()) errors.ticketPrice = "Ticket Price is required";
    if (!formData.ticketAvailable.trim()) errors.ticketAvailable = "Tickets Available is required";
    if (!formData.description.trim()) errors.description = "Description is required";

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      const fullDateTime = new Date(`${formData.date}T${formData.time}`).toISOString();

      data.append("date", fullDateTime);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("category", formData.category);
      data.append("ticketPrice", formData.ticketPrice);
      data.append("ticketAvailable", formData.ticketAvailable);
      data.append("organizer", user._id ); // Include organizer ID from user context
      if (file) {
        data.append("image", file);
      }
      console.log(user._id , "Organizer ID");
      console.log (data.organizer, "Organizer ID in form data");

      const response = await axios.post(`http://localhost:${Port}/api/v1/events`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Event created successfully:", response.data);

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        ticketPrice: "",
        ticketAvailable: "",
      });

      setFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      setSuccessMessage("Event successfully created!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/events");
      }, 2000);
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.response?.data?.error || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="create-event-page">
      <button 
        onClick={() => navigate("/")} 
        className="home-btn"
        style={{ margin: "20px 0" }}
      >
        Home
      </button>
      <section className="form-section">
        <div className="form-container">
          {successMessage && (
            <div className="success-popup">{successMessage}</div>
          )}
          <form className="event-form" onSubmit={handleSubmit} noValidate>
            <h2 className="form-title">Create New Event</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={validationErrors.title ? "input-error" : ""}
                />
                {validationErrors.title && (
                  <small className="input-error-message">{validationErrors.title}</small>
                )}
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={validationErrors.category ? "input-error" : ""}
                />
                {validationErrors.category && (
                  <small className="input-error-message">{validationErrors.category}</small>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={validationErrors.date ? "input-error" : ""}
                />
                {validationErrors.date && (
                  <small className="input-error-message">{validationErrors.date}</small>
                )}
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={validationErrors.time ? "input-error" : ""}
                />
                {validationErrors.time && (
                  <small className="input-error-message">{validationErrors.time}</small>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={validationErrors.location ? "input-error" : ""}
                />
                {validationErrors.location && (
                  <small className="input-error-message">{validationErrors.location}</small>
                )}
              </div>

              <div className="form-group">
                <label>Ticket Price ($)</label>
                <input
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={validationErrors.ticketPrice ? "input-error" : ""}
                />
                {validationErrors.ticketPrice && (
                  <small className="input-error-message">{validationErrors.ticketPrice}</small>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tickets Available</label>
                <input
                  type="number"
                  name="ticketAvailable"
                  value={formData.ticketAvailable}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  className={validationErrors.ticketAvailable ? "input-error" : ""}
                />
                {validationErrors.ticketAvailable && (
                  <small className="input-error-message">{validationErrors.ticketAvailable}</small>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={validationErrors.description ? "input-error" : ""}
              />
              {validationErrors.description && (
                <small className="input-error-message">{validationErrors.description}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="image-upload">Image</label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {preview && (
                <img src={preview} alt="Preview" className="image-preview" />
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || !user || user.role !== "Organizer"} 
              className="submit-btn"
              title={!user ? "Please login first" : user.role !== "Organizer" ? "Only organizers can create events" : ""}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CreateEventPage;