import React from "react";
import axios from "axios";
import "./BookingDetails.css";
const Port = import.meta.env.VITE_API_PORT || 4000;

function BookingDetails({ data, onBookingClick, onCancel }) {
  const renderBooking = (booking, onClick) => {
    const bookingId = booking._id || booking.id;

    const handleCancel = async (e) => {
      // Prevent triggering the parent div's onClick
      e.stopPropagation();

      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmCancel) return;

      try {
        const response = await axios.delete(
          `http://localhost:${Port}/api/v1/bookings/${bookingId}`,
          {
            withCredentials: true,
          }
        );
        alert("Booking cancelled successfully.");

        // Notify parent to refresh bookings list
        onCancel?.(bookingId);
      } catch (error) {
        console.error("Cancel booking error:", error);
        const message =
          error.response?.data?.message || "Failed to cancel the booking.";
        alert(message);
      }
    };

    return (
      <div
        key={bookingId}
        className={`booking-card ${onClick ? "clickable" : ""}`}
        onClick={onClick ? () => onClick(bookingId) : undefined}
        title={onClick ? "View booking details" : undefined}
      >
        <div className="booking-detail">
          <span className="booking-label">Booking ID:</span> {bookingId}
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
          <span className="booking-label">Total Price:</span>{" "}
          {booking.totalPrice}
        </div>
        <div className="booking-detail">
          <span className="booking-label">Status:</span> {booking.status}
        </div>
        <div className="booking-detail">
          <span className="booking-label">Created At:</span>{" "}
          {booking.createdAt
            ? new Date(booking.createdAt).toLocaleString()
            : ""}
        </div>
        <div className="booking-detail">
          <span className="booking-label">Updated At:</span>{" "}
          {booking.updatedAt
            ? new Date(booking.updatedAt).toLocaleString()
            : ""}
        </div>

        {/* Cancel Button */}
        {booking.status !== "cancelled" && (
          <button className="cancel-button" onClick={handleCancel}>
            Cancel Booking
          </button>
        )}
      </div>
    );
  };

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
