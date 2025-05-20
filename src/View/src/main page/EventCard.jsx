import "./styles/EventCard.css"

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="event-image" />
        <div className="event-date">
          <span className="event-month">{event.date.month}</span>
          <span className="event-day">{event.date.day}</span>
        </div>
      </div>
      <div className="event-details">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
      </div>
    </div>
  )
}

export default EventCard