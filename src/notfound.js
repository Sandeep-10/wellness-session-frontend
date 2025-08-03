import './notfound.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not-found"
      className="not-found-img"
    />
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.</p>
    <a href="/">Go Back Home</a>
  </div>
)

export default NotFound