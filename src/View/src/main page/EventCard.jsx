import "./styles/EventCard.css"
import { CiGrid41 } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
 
const Port = import.meta.env.VITE_API_PORT || 3500;

const EventCard = ({ event }) => {
  // Create proper date object from event date
  const eventDate = new Date(event.date);
  
  // Month names array (all lowercase to match original)
  const months = ["jan","feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  
 
  return (
    <div className="event-card">
      <Link to={`/events/${event._id}`}>
        <div className="event-image-container">
          <img 
            src={
              event.image
                ? `http://localhost:${Port}/${event.image}`
                : "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924"
            } 
            alt={event.title} 
            className="event-image" 
          />
          <div className="event-date">
            <span className="event-month">{months[eventDate.getMonth()]}</span>
            <span className="event-day">{eventDate.getDate()}</span>
          </div>
        </div>
        <div className="event-details">
          <h3 className="event-title">{event.title} - {event.location}</h3>
          <p className="event-description">
            {event.description
              ? event.description.length > 46
                ? event.description.slice(0, 46) + "..."
                : event.description
              : "No Description was given"}
          </p>
          <div className="category-type">
            <CiGrid41 className="event-icon"/>
            <p className="category-text">Category: {event.category}</p>
          </div>
        </div>
      </Link>
      
    
    </div>
  );
};

export default EventCard;