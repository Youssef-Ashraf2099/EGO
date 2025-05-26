import "./styles/EventListing.css";
import EventCard from "./EventCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { useAuth } from "../AuthContext"; // Import auth context

const Port = import.meta.env.VITE_API_PORT || 3500;

axios.defaults.withCredentials = true;
const EventsListing = ({isHome, searchWord='', filterCategory = "category", fiterLocation = "location"}) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { role } = useAuth(); // Get user from auth context
  
  // Check if user is an organizer
  const isOrganizer = role  === "Organizer";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Different endpoint based on user role
        let endpoint = `http://localhost:${Port}/api/v1/events/`;
        
        // If user is organizer and we're not on the home page, show only their events
        if (isOrganizer && !isHome) {
          // Use the route as defined in your router
          endpoint = `http://localhost:${Port}/api/v1/events/organizer/events`;
        }
        
        const response = await axios.get(endpoint, {
          withCredentials: true // Ensure credentials are sent with the request
        });
        console.log(response.data);
        // Ensure events is always an array
        setEvents(Array.isArray(response.data) ? response.data : 
                  response.data?.events || // Check if events is a property
                  response.data?.data || // Common API pattern
                  []);
      } catch (error) {
        console.error("Error fetching events:", error);
        console.error("Response:", error.response);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [isOrganizer, isHome]); // Re-fetch when organizer status or page type changes
  
  if (isLoading) {
    return (
      <div className="loader-container">
        <PacmanLoader color="#EFBA1A" size={50} />
      </div>
    );
  }
  
  const isCategoryFilter = filterCategory !== "category";
  const isLocationFilter = fiterLocation !== "location";
  const isFilter = isCategoryFilter || isLocationFilter;

  return (
    <section className="events-section">
      <div className="container">
        <div className="events-header">
          <h2 className="section-title">
            {isHome ? "Featured Events" : isOrganizer ? "My Events" : "All Events"}
          </h2>
          {isOrganizer && !isHome && (
            <div className="organizer-controls">
              <p className="organizer-note"></p>
              <button 
                className="btn btn-primary create-event-btn"
                onClick={() => window.location.href = "/events/create/new"}
              >
                <i className="fas fa-plus-circle"></i> Create Event
              </button>
            </div>
          )}
        </div>

        <div className="events-grid">
          {events.length === 0 ? (
            <div className="no-events-message">
              {isOrganizer && !isHome ? 
                "You haven't created any events yet. Use the 'Create Event' button to get started!" : 
                "No events found matching your criteria."}
            </div>
          ) : (
            isHome
              ? events.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6).map((event) => (
                  <EventCard key={event._id} event={event} />
                ))
              : events.filter(item => {
                  if (!isFilter) {
                    return true; // No filtering applied
                  }

                  const matchesCategory = isCategoryFilter
                    ? item.category.toLowerCase() === filterCategory.toLowerCase()
                    : true;

                  const matchesLocation = isLocationFilter
                    ? item.location.toLowerCase() === fiterLocation.toLowerCase()
                    : true;

                  return matchesCategory && matchesLocation;
                }).sort((a, b) => new Date(b.date) - new Date(a.date))
                .filter(item => searchWord.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchWord.toLowerCase()))
                .map((event) => (
                  <EventCard key={event._id} event={event} />
                ))
          )}
        </div>

        <div className="load-more">
          {isHome ? (
            <a href="/events">
              <button className="btn btn-outline load-more-button">
                {isOrganizer ? "View My Events" : "Show All"}
              </button>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsListing;