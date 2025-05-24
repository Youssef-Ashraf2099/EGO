import "./styles/CreateEvent.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the auth context

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Get user from auth context
  
  const isOrganizer = user && user.role === "Organizer";

  const handleClick = () => {
    if (isOrganizer) {
      navigate("/events/create/new");
    } else if (!user) {
      // If not logged in, redirect to login
      alert("Please login first to create events!");
      navigate("/login");
    } else {
      // If logged in but not an organizer
      alert("Only organizers can create events! Please contact admin to upgrade your account.");
    }
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
            title={!isOrganizer ? "Only organizers can create events" : "Create a new event"}
          >
            {loading ? "Loading..." : 
             isOrganizer ? "Create Events" : 
             user ? "Upgrade to Organizer" : "Login to Create Events"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CreateEvent