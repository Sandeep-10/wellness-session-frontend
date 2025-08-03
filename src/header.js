import { Link,withRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import './header.css';

const Header = (props) => {
    const handleLogout = () => {
        Cookies.remove('jwt_token');
        const {history} = props;
        history.replace('/login');
    }
    
    return (
        <div className="header-container">
            <div className="nav-container">
                <Link to="/" className="logo">
                    Wellness Sessions
                </Link>
                <div className="nav-links">
                    <Link to="/my-sessions" className="nav-link">
                        My Sessions
                    </Link>
                    <Link to="/session-editor" className="nav-link">
                        Create Session
                    </Link>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header);