import "./styles/EventListing.css"
import EventCard from "./EventCard"

const EventsSection = () => {
  const events = [
    {
      id: 1,
      date: { day: 14, month: "JUN" },
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description: "We'll get you directly seated and inside for you to enjoy the show.",
      image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
    },
    {
      id: 2,
      date: { day: 20, month: "JUL" },
      title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
    },
    {
      id: 3,
      date: { day: 18, month: "AUG" },
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
    },
    {
      id: 4,
      date: { day: 14, month: "JUN" },
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description: "We'll get you directly seated and inside for you to enjoy the show.",
      image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
    },
    {
      id: 5,
      date: { day: 20, month: "JUL" },
      title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
    },
    {
      id: 6,
      date: { day: 18, month: "AUG" },
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
    },
  ]

  return (
    <section className="events-section">
      <div className="container">
        <div className="events-header">
          <h2 className="section-title">Upcoming Events</h2>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="load-more">
          <button className="btn btn-outline load-more-button">Load More</button>
        </div>
      </div>
    </section>
  )
}

export default EventsSection