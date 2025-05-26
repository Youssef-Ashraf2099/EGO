import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EventBookingForm from "./EventBookingForm";
import BookingDetails from "./BookingDetails";
import "./BookingEvent.css";

function BookingEvent() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const PORT = import.meta.env.VITE_API_PORT || 4000;

  useEffect(() => {
    console.log("useEffect running, id:", id);

    if (id) {
      // Try to fetch booking first
      axios
        .get(`http://localhost:${PORT}/api/v1/bookings/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Found booking:", res.data);
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // Fallback to event data
            console.log("Booking not found, trying to fetch event details");
            axios
              .get(`http://localhost:${PORT}/api/v1/events/${id}`, {
                withCredentials: true,
              })
              .then((eventRes) => {
                console.log("Event found:", eventRes.data);
                setEvent(eventRes.data);
                setLoading(false);
              })
              .catch((eventErr) => {
                console.error("Event fetch error:", eventErr);
                setError("Event not found");
                setLoading(false);
              });
          } else {
            setError(err.message || "Failed to load data");
            setLoading(false);
          }
        });
    } else {
      // Fetch all bookings
      axios
        .get(`http://localhost:${PORT}/api/v1/users/bookings`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("All bookings:", res.data);
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load bookings:", err);
          setError(err.message || "Failed to load bookings");
          setLoading(false);
        });
    }
  }, [id, navigate]);

  const navigateToBooking = (bookingId) => {
    window.location.href = `/bookings/${bookingId}`;
  };

  // ✅ Add this function to remove cancelled booking
  const handleCancel = (cancelledId) => {
    if (Array.isArray(data)) {
      setData(data.filter((booking) => booking._id !== cancelledId));
    } else if (data && data._id === cancelledId) {
      setData(null); // For single booking view
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container alert alert-danger">Error: {error}</div>
    );

  if (event) {
    return (
      <EventBookingForm event={event} navigateToBooking={navigateToBooking} />
    );
  }

  if (!data) return <div className="no-data-message">No booking(s) found.</div>;

  return (
    <BookingDetails
      data={data}
      onBookingClick={(id) => navigate(`/bookings/${id}`)}
      onCancel={handleCancel} // ✅ Now cancellations update the UI
    />
  );
}

export default BookingEvent;
