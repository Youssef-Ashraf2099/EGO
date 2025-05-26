import "./UnAuthorized.css";

const UnAuthorized = () => {
  return (
    <div className="unauthorized-container">
       <div className="message">You are not authorized.
  </div>
  <div className="message2">You tried to access a page you did not have prior authorization for.
    return to the <a className="return-home" href="/">home page</a> or contact the site administrator if you believe this is an error.
  </div>
  <div className="container-unauthorized">
    <div className="neon">403</div>
    <div className="door-frame">
      <div className="door">
        <div className="rectangle">
        </div>
        <div className="handle">
        </div>
        <div className="window">
          <div className="eye">
          </div>
          <div className="eye eye2">
          </div>
          <div className="leaf">
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default UnAuthorized
