import "./PageNotFound.css";

const pageNotFound = () => {
  return (
    <>
      <div className="hello">
        <div className="container2">
          <div className="error-image">
            <img
              src="https://ik.imagekit.io/wuxgiazko/hero-img-01.png?updatedAt=1747942369179"
              alt="404 Error"
              id="error-placeholder"
            />
          </div>

          <div className="error-text">
            <h1>Ooops!</h1>
            <h2>Looks like you're in the wrong place.</h2>
            <p>
              We can't find the page you're looking for...{" "}
              <a href="/" className="home-link">
                → Take me home
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default pageNotFound;
