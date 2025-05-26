import React, { useState } from "react";
import axios from "axios";
import "./EventBookingForm.css";

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
    <div className="event-booking-container container">
      <h2>Book Tickets for {event.name}</h2>
      <div className="event-card card">
        <div className="card-body">
          <h5 className="event-title">{event.name}</h5>
          <p className="event-description">{event.description}</p>
          <div className="event-details-row row">
            <div className="event-details-column col-md-6">
              <p className="event-detail">
                <span className="detail-label">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="event-detail">
                <span className="detail-label">Time:</span>{" "}
                {new Date(event.date).toLocaleTimeString()}
              </p>
              <p className="event-detail">
                <span className="detail-label">Location:</span> {event.location}
              </p>
            </div>
            <div className="event-details-column col-md-6">
              <p className="event-detail">
                <span className="detail-label">Category:</span> {event.category}
              </p>
              <p className="event-detail">
                <span className="detail-label">Price per Ticket:</span> $
                {event.ticketPrice}
              </p>
              <p className="event-detail">
                <span className="detail-label">Available Tickets:</span>{" "}
                {event.ticketAvailable}
              </p>
            </div>
          </div>

          {bookingSuccess && (
            <div className="success-message">
              Booking successful! Redirecting to booking details...
            </div>
          )}

          {bookingError && (
            <div className="error-message">Error: {bookingError}</div>
          )}

          <div className="ticket-form-group form-group">
            <label htmlFor="numberOfTickets">Number of Tickets:</label>
            <input
              type="number"
              className="ticket-input form-control"
              id="numberOfTickets"
              value={numberOfTickets}
              onChange={handleTicketChange}
              min="1"
              max={event.ticketAvailable}
            />
          </div>

          <div className="total-price">
            <strong>Total Price:</strong> ${totalPrice}
          </div>

          <button
            className="book-button btn btn-primary"
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
