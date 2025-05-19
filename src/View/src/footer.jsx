function Footer() {
  return (
    <footer className="footer">
      <div className="company-info">
        <p className="text-muted">© {new Date().getFullYear()} EGO</p>
      </div>
      <div className="contact-info">
        <p className="text-muted">Contact us:</p>
        <p className="text-muted">Email:joe.ashraf@gmail.com</p>
        <p className="text-muted">Phone: 0123456789</p>
      </div>
      <div className="social-media">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div className="terms">
        <a href="/terms" className="text-muted">
          Terms of Service
        </a>
        <a href="/privacy" className="text-muted">
          Privacy Policy
        </a>
        <a href="/aboutus" className="text-muted">
          About Us
        </a>
      </div>
    </footer>
  );
}
export default Footer;
