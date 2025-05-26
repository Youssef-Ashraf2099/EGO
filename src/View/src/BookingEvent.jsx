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

  // Fetch event details if ID is provided
  useEffect(() => {
    console.log("useEffect running, id:", id);

    // If we have an ID, check if it's a booking ID or an event ID
    if (id) {
      // First try to get booking details
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
            // If booking not found, try to get event details for booking form
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
      // If no ID, fetch all user bookings
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

  if (loading)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5 alert alert-danger">Error: {error}</div>
    );

  // Render booking form if we have an event
  if (event) {
    return (
      <EventBookingForm event={event} navigateToBooking={navigateToBooking} />
    );
  }

  // If no data, show message
  if (!data)
    return (
      <div className="container mt-5 alert alert-info">
        No booking(s) found.
      </div>
    );

  // Render booking details
  return (
    <BookingDetails
      data={data}
      onBookingClick={(id) => navigate(`/bookings/${id}`)}
    />
  );
}

export default BookingEvent;
