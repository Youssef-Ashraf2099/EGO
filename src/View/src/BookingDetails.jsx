import React from "react";

function BookingDetails({ data, onBookingClick }) {
  // Helper to render booking details
  const renderBooking = (booking, onClick) => (
    <div
      key={booking._id || booking.id}
      style={{
        border: "2px solid gold",
        margin: "10px",
        padding: "16px",
        cursor: onClick ? "pointer" : "default",
        background: "#fff",
        color: "#b8860b", // golden text
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(218,165,32,0.08)",
        fontWeight: 500,
      }}
      onClick={onClick ? () => onClick(booking._id || booking.id) : undefined}
      title={onClick ? "View booking details" : undefined}
    >
      <div>
        <strong style={{ color: "#b8860b" }}>Booking ID:</strong>{" "}
        {booking._id || booking.id}
      </div>
      <div>
        <strong style={{ color: "#b8860b" }}>User:</strong>{" "}
        {typeof booking.user === "object"
          ? booking.user.name || booking.user._id
          : booking.user}
      </div>
      <div>
        <strong style={{ color: "#b8860b" }}>Event:</strong>{" "}
        {typeof booking.event === "object"
          ? booking.event.title || booking.event.name
          : booking.event}
      </div>
      <div>
        <strong style={{ color: "#b8860b" }}>Number of Tickets:</strong>{" "}
        {booking.numberOfTickets}
      </div>
      <div>
        <strong style={{ color: "#b8860b" }}>Total Price:</strong>{" "}
        {booking.totalPrice}
      </div>
      <div>
        <strong style={{ color: "#b8860b" }}>Status:</strong> {booking.status}
      </div>
      <div>
        <strong style={{ color: "#b8860b" }}>Created At:</strong>{" "}
        {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : ""}
      </div>
      <div>
        <strong style={{ color: "#b8860b" }}>Updated At:</strong>{" "}
        {booking.updatedAt ? new Date(booking.updatedAt).toLocaleString() : ""}
      </div>
    </div>
  );

  if (Array.isArray(data)) {
    return (
      <div className="container mt-4">
        <h2>Your Bookings</h2>
        {data.length > 0 ? (
          data.map((booking) => renderBooking(booking, onBookingClick))
        ) : (
          <p>You don't have any bookings yet.</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="container mt-4">
        <h2>Booking Details</h2>
        {renderBooking(data, null)}
      </div>
    );
  }
}

export default BookingDetails;
