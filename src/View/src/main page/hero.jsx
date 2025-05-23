import "./styles/hero.css"
import { useState } from "react"

const Hero = () => {
  const imagePath = ["https://ik.imagekit.io/wuxgiazko/image.svg?updatedAt=1747771880678","https://ik.imagekit.io/wuxgiazko/image%20(1).svg?updatedAt=1747811675219","https://ik.imagekit.io/wuxgiazko/Rectangle%2012%20(1).svg?updatedAt=1747812268594"]
  const [index, setIndex] = useState(0)

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            EGO Events Booking
            <br />
            Event Ticket Package
          </h1>
          <p className="hero-description">
            Book exclusive tickets for the best price including tickets for sports, concerts, nightclubs, shows, movies
            and more
          </p>
          <div className="hero-buttons">
            <a href="/events">
            <button className="btn btn-primary">Get Ticket</button>
            </a>
            <a href = "/aboutus">
            <button className="btn btn-outline">Learn More</button>
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <img src={imagePath[index % imagePath.length]} alt="Concert" className="hero-image" />
          <button onClick={()=>setIndex(index+1)}  className="slider-button slider-prev">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button onClick={()=>setIndex(index-1)} className="slider-button slider-next">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero