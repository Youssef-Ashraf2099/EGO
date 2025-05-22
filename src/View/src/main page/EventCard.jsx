import "./styles/EventCard.css"

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date)
  const months = ["jan","feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src={event.image ? event.image : "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924"} alt={event.title} className="event-image" />
        <div className="event-date">
          <span className="event-month">{months[eventDate.getMonth()-1]}</span>
          <span className="event-day">{eventDate.getDay()}</span>
        </div>
      </div>
      <div className="event-details">
        <h3 className="event-title">{event.title + " (" + event.category + ") " +" - " + event.location}</h3>
        <p className="event-description">{event.description?event.description:"No description was written"}</p>
      </div>
    </div>
  )
}

export default EventCard