import React from "react";
import "./BookingDetails.css";

function BookingDetails({ data, onBookingClick }) {
  // Helper to render booking details
  const renderBooking = (booking, onClick) => (
    <div
      key={booking._id || booking.id}
      className={`booking-card ${onClick ? "clickable" : ""}`}
      onClick={onClick ? () => onClick(booking._id || booking.id) : undefined}
      title={onClick ? "View booking details" : undefined}
    >
      <div className="booking-detail">
        <span className="booking-label">Booking ID:</span>{" "}
        {booking._id || booking.id}
      </div>
      <div className="booking-detail">
        <span className="booking-label">User:</span>{" "}
        {typeof booking.user === "object"
          ? booking.user.name || booking.user._id
          : booking.user}
      </div>
      <div className="booking-detail">
        <span className="booking-label">Event:</span>{" "}
        {typeof booking.event === "object"
          ? booking.event.title || booking.event.name
          : booking.event}
      </div>
      <div className="booking-detail">
        <span className="booking-label">Number of Tickets:</span>{" "}
        {booking.numberOfTickets}
      </div>
      <div className="booking-detail">
        <span className="booking-label">Total Price:</span> {booking.totalPrice}
      </div>
      <div className="booking-detail">
        <span className="booking-label">Status:</span> {booking.status}
      </div>
      <div className="booking-detail">
        <span className="booking-label">Created At:</span>{" "}
        {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : ""}
      </div>
      <div className="booking-detail">
        <span className="booking-label">Updated At:</span>{" "}
        {booking.updatedAt ? new Date(booking.updatedAt).toLocaleString() : ""}
      </div>
    </div>
  );

  if (Array.isArray(data)) {
    return (
      <div className="bookings-container container">
        <h2 className="booking-title">Your Bookings</h2>
        {data.length > 0 ? (
          data.map((booking) => renderBooking(booking, onBookingClick))
        ) : (
          <p className="no-bookings-message">
            You don't have any bookings yet.
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div className="bookings-container container">
        <h2 className="booking-title">Booking Details</h2>
        {renderBooking(data, null)}
      </div>
    );
  }
}

export default BookingDetails;
