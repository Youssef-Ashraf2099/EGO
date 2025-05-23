import EventsListing from "./main page/EventListing"
import { useEffect, useState } from "react"
import "./EventPage.css"
import axios from "axios"


const EventPage = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('category')
  const [location, setLocation] = useState('location')
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } 
    };

    fetchEvents();
  }, []);

  const Categoryfilter = new Set()
  events.map((event) => (Categoryfilter.add(event.category)))

  const locationfilter = new Set()
  events.map((event) => (locationfilter.add(event.location)))

  return (
    <>
    <div className="filter-container">
       <select className="filter-select" onChange={e=>setCategory(e.target.value)}>
            <option value="category">Category</option>
             {[...Categoryfilter].map((eventCategory, index) => (
    <option key={index} value={eventCategory}>
      {eventCategory}
    </option>
  ))}
        </select>
        <select className="filter-select" onChange={e=>setLocation(e.target.value)}>
            <option value="location">Location</option>
           {[...locationfilter].map((eventCategory, index) => (
    <option key={index} value={eventCategory}>
      {eventCategory}
    </option>
  ))}
        </select>
        </div>
    
    <input className="input" placeholder="Search" type="text"onChange={e=>setSearch(e.target.value)} />
      <EventsListing isHome={false} searchWord={search} filterCategory = {category} fiterLocation = {location}/>
    </>
  )
}

export default EventPage
