import "./styles/EventListing.css"
import EventCard from "./EventCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { PacmanLoader } from "react-spinners"


axios.defaults.withCredentials = true

const EventsListing = ({isHome}) => {
  // const events = [
  //   {
  //     id: 1,
  //     date: { day: 14, month: "JUN" },
  //     title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
  //     description: "We'll get you directly seated and inside for you to enjoy the show.",
  //     image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
  //   },
  //   {
  //     id: 2,
  //     date: { day: 20, month: "JUL" },
  //     title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
  //     description: "Directly seated and inside for you to enjoy the show.",
  //     image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
  //   },
  //   {
  //     id: 3,
  //     date: { day: 18, month: "AUG" },
  //     title: "2011 Super Junior SM Town Live '10 World Tour New York City",
  //     description: "Directly seated and inside for you to enjoy the show.",
  //     image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
  //   },
  //   {
  //     id: 4,
  //     date: { day: 14, month: "JUN" },
  //     title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
  //     description: "We'll get you directly seated and inside for you to enjoy the show.",
  //     image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
  //   },
  //   {
  //     id: 5,
  //     date: { day: 20, month: "JUL" },
  //     title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
  //     description: "Directly seated and inside for you to enjoy the show.",
  //     image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
  //   },
  //   {
  //     id: 6,
  //     date: { day: 18, month: "AUG" },
  //     title: "2011 Super Junior SM Town Live '10 World Tour New York City",
  //     description: "Directly seated and inside for you to enjoy the show.",
  //     image: "https://ik.imagekit.io/wuxgiazko/Rectangle%2012.svg?updatedAt=1747772816924",
  //   },
  // ]
const [events, setEvents] = useState([])
const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/events/`)
        console.log(response.data) 
        setEvents(response.data)
      } catch (error) {
        console.error("Error fetching events:", error)
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])    
 
if (isLoading) {
    return (
      <div className="loader-container">
        <PacmanLoader color="#EFBA1A" size={50}/>
      </div>
    );
  }

  return (
    <section className="events-section">
      <div className="container">
        <div className="events-header">
          <h2 className="section-title">{isHome? "Featured Events":"All Events"}</h2>
        </div>

        <div className="events-grid" >
          {isHome
    ? events.slice(0, 6).map((event) => (
        <EventCard key={event._id} event={event} />
      ))
    : events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
        </div>

        <div className="load-more">
          {isHome?<a href="/events"><button className="btn btn-outline load-more-button">Show All</button></a>:""}
        </div>
      </div>
    </section>
  )
}

export default EventsListing