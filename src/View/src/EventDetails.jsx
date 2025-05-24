import axios from "axios";
import "./EventDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners"
const Port = import.meta.env.VITE_API_PORT || 5000;

const EventDetails = () => {
  const { id } = useParams();
  const [ event, setEvent ] = useState(null);
  const [ isloading, setIsLoading ] = useState(true);
  const months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${Port}/api/v1/events/${id}`
        );
        console.log(response.data);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (isloading) {
    return (
      <div className="loader-container">
        <PacmanLoader color="#EFBA1A" size={50} />
      </div>
    );
  }

  const date = new Date(event.date)
  return (
    <>
      <div className="detailsBody">
        <div className="content">
          <main>
            <section className="event-image2">
              <img
                src={event.image?event.image:"https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"}
                alt="Music Concert Event"
              />
            </section>

            <section className="event-details">
              <div className="event-header">
                <h1>{event.title}</h1>
                <div className="event-meta">
                  <span className="date">{months[date.getMonth()-1] +" "+ date.getDay()+','+ date.getFullYear()}</span>
                  <span className="location">{event.location}</span>
                </div>
              </div>

              <div className="event-description">
                <p>
                  {event.description?event.description:"No Description was Given"}
                </p>
              </div>

              <div className="ticket-info">
                <div className="ticket-types">
                  <div className="ticket-type">
                    <h3>Event Price</h3>
                    <p className="price">{'$'+event.ticketPrice}</p>
                    <p className="availability">
                      Available: <span>{event.ticketAvailable +' tickets'}</span>
                      <span>    - </span>
                      Sold: <span>{event.ticketSold +' tickets'}</span>
                    </p>
                  </div>
                  <div className="ticket-type">
                    <h3>Category</h3>
                    <p className="price">{event.category}</p>
                    <p className="availability">
                    </p>
                  </div>
                </div>

                <button className="book-now">Book Now</button>
              </div>
            </section>
          </main>

          <footer>
            <p>&copy; 2025 EGO Events. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
