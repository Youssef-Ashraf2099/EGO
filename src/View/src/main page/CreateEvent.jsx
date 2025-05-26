import "./styles/CreateEvent.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the auth context

const CreateEvent = () => {
  const navigate = useNavigate();
  const { role } = useAuth(); // Get role from auth context
  
  const isOrganizer = role === "Organizer";

  const handleClick = () => {
    if (isOrganizer) {
      navigate("/events/create/new");
    } else if (!role) {
      // If not logged in, redirect to login
      alert("Please login first to create events!");
      navigate("/api/v1/login");
    } else {
      // If logged in but not an organizer
      alert("Only organizers can create events!");
    }
  };

  return (
    <section className="create-event-section">
      <div className="container">
        <div className="create-event-content">
          <h2 className="create-event-title">Make your own Event</h2>
          <p className="create-event-description">
            {isOrganizer ? "Create":"Sign in as organizer to create"} and manage your own events—from private meetups to large-scale experiences. Set your pricing, and
            start selling tickets today.
          </p>
          <button 
            className="btn btn-pink" 
            onClick={handleClick}
            title={!isOrganizer ? "Only organizers can create events" : "Create a new event"}
          >
            {isOrganizer ? "Create Events" : 
             role ? "Upgrade to Organizer" : "Login to Create Events"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CreateEvent