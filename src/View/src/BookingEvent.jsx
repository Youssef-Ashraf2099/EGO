import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Port = import.meta.env.PORT || 2099;

function BookingEvent() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect running, id:", id);
    let url = `http://localhost:${Port}/api/v1/bookings`;
    if (id) {
      url = `http://localhost:${Port}/api/v1/bookings/${id}`;
    }
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No booking(s) found.</div>;

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
      <div>
        <h2>All Bookings</h2>
        {data.map(renderBooking)}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Booking Details</h2>
        {renderBooking(data)}
      </div>
    );
  }
}

export default BookingEvent;
