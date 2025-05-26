import React, { useState } from "react";
import axios from "axios";

function EventBookingForm({ event, navigateToBooking }) {
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(event.ticketPrice);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const PORT = import.meta.env.VITE_API_PORT || 4000;

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
        setTimeout(() => {
          navigateToBooking(res.data._id);
        }, 2000);
      })
      .catch((err) => {
        console.error("Booking error:", err);
        setBookingError(err.response?.data?.error || "Failed to book tickets");
      });
  };

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

export default EventBookingForm;
