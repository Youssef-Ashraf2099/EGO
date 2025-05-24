import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <svg className="footer-logo-icon" viewBox="0 0 24 24">
                <path d="M4 4h16v7H4zm0 9h16v7H4zm3-5h10M7 15h10"></path>
              </svg>
              <span className="footer-logo-text">EIGO</span>
            </div>
            <p className="footer-description">
              Eventick is a global self-service ticketing platform for live
              experiences that allows anyone to create, share, find and attend
              events that fuel their passions and enrich their lives.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a href="#" className="social-icon twitter">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                </svg>
              </a>
              <a href="#" className="social-icon linkedin">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Plan Events</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Create and Set Up</a>
              </li>
              <li>
                <a href="#">Sell Tickets</a>
              </li>
              <li>
                <a href="#">Online RSVP</a>
              </li>
              <li>
                <a href="#">Online Events</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Eventick</h3>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">How it Works</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Stay In The Loop</h3>
            <p className="footer-newsletter-text">
              Join our mailing list to stay in the loop with our newest for
              Event and concert
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            Copyright © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
