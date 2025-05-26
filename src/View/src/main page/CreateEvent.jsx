import "./styles/CreateEvent.css"
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const isOrganizer = true; // Always assume organizer

  const handleClick = () => {
    navigate("/events/create/new");
  };

  return (
    <section className="create-event-section">
      <div className="container">
        <div className="create-event-content">
          <h2 className="create-event-title">Make your own Event</h2>
          <p className="create-event-description">
            Create and manage your own events—from private meetups to large-scale experiences. Set your pricing, and
            start selling tickets today.
          </p>
          <button 
            className="btn btn-pink" 
            onClick={handleClick}
            title="Create a new event"
          >
            Create Events
          </button>
        </div>
      </div>
    </section>
  )
}

export default CreateEvent