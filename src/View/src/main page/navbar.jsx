import "./styles/Navbar.css"

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24">
            <path d="M4 4h16v7H4zm0 9h16v7H4zm3-5h10M7 15h10"></path>
          </svg>
          <span className="logo-text">E|GO</span>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-link">
            Try me
          </a>
          <a href="#" className="nav-link">
            Events
          </a>
          <a href="#" className="nav-link">
            Contact
          </a>
          <a href="#" className="nav-link nav-button">
            Get started
          </a>
        </nav>

        <button className="mobile-menu-button">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Navbar
