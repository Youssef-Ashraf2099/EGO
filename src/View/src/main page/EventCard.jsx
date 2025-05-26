import "./styles/EventCard.css"
import { CiGrid41 } from "react-icons/ci";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { useState,useEffect } from "react";

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date)
  const months = ["jan","feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  const [isEventEnded, setIsEventEnded] = useState(false);
   useEffect(() => {
    if (eventDate < new Date()) {
      setIsEventEnded(true);
    }
  }, [eventDate]);

  return (
    <div className="event-card">
      <a href={!isEventEnded?"/events/" + event._id:"#"} onClick={e=>{
        if (isEventEnded) {
          e.preventDefault();
          alert("This event has ended.");
        }
      }}>
      <div className="event-image-container">
        <img src={isEventEnded?"https://ik.imagekit.io/wuxgiazko/hero-img-01%20(2).jpg?updatedAt=1748259740583":event.image ? event.image : "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924"} alt={event.title} className="event-image" />
        <div className="event-date">
          <span className="event-month">{months[eventDate.getMonth()-1]}</span>
          <span className="event-day">{eventDate.getDay()}</span>
        </div>
      )}
      
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