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
      <div className="loading-container">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container alert alert-danger">Error: {error}</div>
    );

  // Render booking form if we have an event
  if (event) {
    return (

      <div className="container mt-4">
        <h2>Book Tickets for {event.title}</h2>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">{event.description}</p>
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(event.date).toLocaleTimeString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Category:</strong> {event.category}
                </p>
                <p>
                  <strong>Price per Ticket:</strong> ${event.ticketPrice}
                </p>
                <p>
                  <strong>Available Tickets:</strong> {event.ticketAvailable}
                </p>
              </div>
            </div>

            {bookingSuccess && (
              <div className="alert alert-success">
                Booking successful! Redirecting to booking details...
              </div>
            )}

            {bookingError && (
              <div className="alert alert-danger">Error: {bookingError}</div>
            )}

            <div className="form-group mb-3">
              <label htmlFor="numberOfTickets">Number of Tickets:</label>
              <input
                type="number"
                className="form-control"
                id="numberOfTickets"
                value={numberOfTickets}
                onChange={handleTicketChange}
                min="1"
                max={event.ticketAvailable}
              />
            </div>

            <div className="mb-3">
              <strong>Total Price:</strong> ${totalPrice}
            </div>

            <button
              className="btn btn-primary"
              onClick={handleBooking}
              disabled={bookingSuccess || event.ticketAvailable < 1}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <EventBookingForm event={event} navigateToBooking={navigateToBooking} />

    );
  }

  // If no data, show message
  if (!data) return <div className="no-data-message">No booking(s) found.</div>;

  // Render booking details
  return (
    <BookingDetails
      data={data}
      onBookingClick={(id) => navigate(`/bookings/${id}`)}
    />
  );
}

export default BookingEvent;
