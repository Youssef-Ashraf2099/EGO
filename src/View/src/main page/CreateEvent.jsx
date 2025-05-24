

import "./styles/CreateEvent.css"
import { useNavigate } from "react-router-dom";  

const CreateEvent = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/events/create/new");
  };

  return (
    <section className="create-event-section">
      {/* <img src="https://ik.imagekit.io/wuxgiazko/amico.svg?updatedAt=1747775339305" alt="hello" /> */}
      <div className="container">
        <div className="create-event-content">
          <h2 className="create-event-title">Make your own Event</h2>
          <p className="create-event-description">
            Create and manage your own events—from private meetups to large-scale experiences. Set your pricing, and
            start selling tickets today.
          </p>
          <button className="btn btn-pink" onClick={handleClick}>Create Events</button>
        </div>
      </div>
    </section>
  )
}

export default CreateEvent