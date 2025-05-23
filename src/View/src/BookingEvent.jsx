import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingEvent() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // For booking functionality
  const [event, setEvent] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

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
                setTotalPrice(eventRes.data.ticketPrice);
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
        .get(`http://localhost:${PORT}/api/v1/bookings`, {
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

  // Handle ticket quantity change
  const handleTicketChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (event?.ticketAvailable || 0)) {
      setNumberOfTickets(value);
      setTotalPrice(value * event.ticketPrice);
    }
  };

  // Handle booking submission
  const handleBooking = () => {
    setBookingError(null);
    setBookingSuccess(false);

    axios
      .post(
        `http://localhost:${PORT}/api/v1/bookings`,
        {
          eventId: event._id,
          numberOfTickets: numberOfTickets,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Booking successful:", res.data);
        setBookingSuccess(true);
        // Navigate to the booking details page after a short delay
        setTimeout(() => {
          navigate(`/api/v1/bookings/${res.data._id}`);
        }, 2000);
      })
      .catch((err) => {
        console.error("Booking error:", err);
        setBookingError(err.response?.data?.error || "Failed to book tickets");
      });
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
      <div className="container mt-4">
        <h2>Book Tickets for {event.name}</h2>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{event.name}</h5>
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
    );
  }

  // If no data, show message
  if (!data)
    return (
      <div className="container mt-5 alert alert-info">
        No booking(s) found.
      </div>
    );

  // Rest of your component remains the same...
  // Helper to render booking details
  const renderBooking = (booking) => (
    <div
      key={booking._id || booking.id}
      style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
    >
      <div>
        <strong>Booking ID:</strong> {booking._id || booking.id}
      </div>
      <div>
        <strong>User:</strong> {booking.user}
      </div>
      <div>
        <strong>Event:</strong> {booking.event}
      </div>
      <div>
        <strong>Number of Tickets:</strong> {booking.numberOfTickets}
      </div>
      <div>
        <strong>Total Price:</strong> {booking.totalPrice}
      </div>
      <div>
        <strong>Status:</strong> {booking.status}
      </div>
      <div>
        <strong>Created At:</strong>{" "}
        {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : ""}
      </div>
      <div>
        <strong>Updated At:</strong>{" "}
        {booking.updatedAt ? new Date(booking.updatedAt).toLocaleString() : ""}
      </div>
    </div>
  );

  if (Array.isArray(data)) {
    return (
      <div className="container mt-4">
        <h2>Your Bookings</h2>
        {data.length > 0 ? (
          data.map(renderBooking)
        ) : (
          <p>You don't have any bookings yet.</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="container mt-4">
        <h2>Booking Details</h2>
        {renderBooking(data)}
      </div>
    );
  }
}

export default BookingEvent;
