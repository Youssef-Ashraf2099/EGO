import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // You'll need to install this: npm install js-cookie

function BookingEvent() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const PORT = 2099;

  useEffect(() => {
    // Check if user is logged in using cookies instead of localStorage
    const token = Cookies.get("token");
    console.log("Token from cookies:", token ? "exists" : "not found");

    if (!token) {
      console.log("No token in cookies, redirecting to login");
      navigate("/api/v1/login", { state: { from: window.location.pathname } });
      return;
    }

    console.log("useEffect running, id:", id);
    let url = `http://localhost:${PORT}/api/v1/bookings`;

    if (id) {
      url = `http://localhost:${PORT}/api/v1/bookings/${id}`;
    }

    // Using axios withCredentials to send cookies automatically
    axios
      .get(url, {
        withCredentials: true, // This ensures cookies are sent with the request
      })
      .then((res) => {
        console.log("API response success:", res.status);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "API error:",
          err.response ? err.response.status : err.message
        );
        if (err.response && err.response.status === 401) {
          // Unauthorized - redirect to login
          console.log("401 Unauthorized, clearing token cookie");
          Cookies.remove("token");
          navigate("/api/v1/login", {
            state: { from: window.location.pathname },
          });
        } else {
          setError(err.message || "Failed to load bookings");
          setLoading(false);
        }
      });
  }, [id, navigate]);

  if (loading)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status"></div>
        <p>Loading bookings...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5 alert alert-danger">Error: {error}</div>
    );
  if (!data)
    return (
      <div className="container mt-5 alert alert-info">
        No booking(s) found.
      </div>
    );

  // Rest of your component remains the same
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
