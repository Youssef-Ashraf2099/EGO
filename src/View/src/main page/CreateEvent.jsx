import "./styles/CreateEvent.css"

const CreateEvent = () => {
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
          <button className="btn btn-pink">Create Events</button>
        </div>
      </div>
    </section>
  )
}

export default CreateEvent