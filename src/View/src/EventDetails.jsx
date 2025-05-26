import axios from "axios";
import "./EventDetails.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useAuth } from "./AuthContext"; // Import auth context
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const port = import.meta.env.VITE_API_PORT || 3500;

const EventDetails = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Get user from auth context

  console.log("User from context:", user);
  // Only check if user is an organizer - this doesn't depend on event data
  const isOrganizer = user && user.role === "Organizer";

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${port}/api/v1/events/${id}`
        );
        console.log("Event data:", response.data);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [id]);

  const handleEditEvent = () => {
    // We'll check permissions again here to be safe
    const isEventCreator =
      event &&
      user &&
      event.organizer != undefined &&
      user._id !== undefined &&
      String(event.organizer._id) === String(user._id);

    const canEdit = isOrganizer && isEventCreator;

    if (canEdit) {
      navigate(`/events/edit/${id}`);
    } else {
      alert("Only the organizer who created this event can edit it");
    }
  };

  if (isloading) {
    return (
      <div className="loader-container">
        <PacmanLoader color="#EFBA1A" size={50} />
      </div>
    );
  }

  // Now that we have the event data, we can check if user is the creator
  const isEventCreator =
    event &&
    user &&
    event.organizer != undefined &&
    user._id !== undefined &&
    String(event.organizer._id) === String(user._id);

  // User can edit only if they are both an organizer AND the creator of this event
  const canEditEvent = isOrganizer && isEventCreator;

  const date = new Date(event.date);

  // Prepare analytics data for the chart
  const analyticsData = [
    { name: "Available", tickets: event.ticketAvailable },
    { name: "Sold", tickets: event.ticketSold },
  ];

  const handleBooking = () => {
    // Navigate to the booking page with this event's ID
    navigate(`/bookings/${id}`);
  };
  return (
    <>
      <div className="detailsBody">
        <div className="content">
          <main>
            <section className="event-image2">
              <img
                src={
                  event.image
                    ? `http://localhost:${port}/${event.image}`
                    : "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                }
                alt="Music Concert Event"
              />
            </section>

            <section className="event-details">
              <div className="event-header">
                <h1>{event.title}</h1>
                <div className="event-meta">
                  <span className="date">
                    {months[date.getMonth()] +
                      " " +
                      date.getDate() +
                      "," +
                      date.getFullYear()}
                  </span>
                  <span className="location">{event.location}</span>
                </div>
              </div>

              <div className="event-description">
                <p>
                  {event.description
                    ? event.description
                    : "No Description was Given"}
                </p>
              </div>

              <div className="ticket-info">
                <div className="ticket-types">
                  <div className="ticket-type">
                    <h3>Event Price</h3>
                    <p className="price">{"$" + event.ticketPrice}</p>
                    <p className="availability">
                      Available:{" "}
                      <span>{event.ticketAvailable + " tickets"}</span>
                      <span> - </span>
                      Sold: <span>{event.ticketSold + " tickets"}</span>
                    </p>
                  </div>
                  <div className="ticket-type">
                    <h3>Category</h3>
                    <p className="price">{event.category}</p>
                    <p className="availability"></p>
                  </div>
                </div>
                <div className="action-buttons">
                  {!isOrganizer && (
                    <button className="book-now" onClick={handleBooking}>
                      Book Now
                    </button>
                  )}
                  {canEditEvent && (
                    <button
                      onClick={handleEditEvent}
                      className="edit-event"
                      title="Edit this event"
                    >
                      Edit Event
                    </button>
                  )}
                </div>
              </div>

              {/* Event Analytics Section - Only visible to organizers */}
              {isEventCreator && (
                <div className="event-analytics">
                  <h2>Event Analytics</h2>
                  <div className="analytics-chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={analyticsData}
                        layout="vertical" // This makes the chart display horizontally
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          domain={[0, event.ticketAvailable + event.ticketSold]}
                        />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tickets" fill="#F5167E" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </section>
          </main>

          <footer>
            <p>© 2025 EGO Events. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
