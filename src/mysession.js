import { Component } from "react";
import Cookies from 'js-cookie';
import EachSession from './eachsession';
import './mysession.css';
import { Link } from "react-router-dom";
import Header from './header';
import {
    SpinnerLoader
  } from '@akshay-bhalala/loaders';


class MySession extends Component {
    state = {
        user: [],
        isLoading: true,
    }

     deleteSession = (id) => {
        const {user} = this.state; 
        const filteredData = user.filter((each)=>each.id !== id);
        this.setState({user: filteredData});

    }


    componentDidMount() {
        this.getUserDetails();
    }

     getUserDetails = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        const response = await fetch('https://backend-wellness-session.vercel.app/sessions', options);
        const responseJson = await response.json();
        console.log(responseJson);
        if (response.ok) {
            this.setState({user: responseJson,isLoading: false});
            
        }
    }

    
    render() {
        const { user,isLoading } = this.state;
        const total = user.length;
        return (
            isLoading ? (
                <div className="loader-container">
                    <SpinnerLoader color="#000000" height={80} width={80} />
                </div>
            ) : (
            <div className="mysession-container">
                <Header />
                <div className="mysession-heading">
                    <h1 className="mysession-title">My Wellness Sessions</h1>
                    <p className="mysession-subtitle">
                        Track your wellness journey and manage your sessions
                    </p>
                </div>

                <div className="mysession-stats">
                    <div className="stat-item">
                        <div className="stat-number">{total}</div>
                        <div className="stat-label">Total Sessions</div>
                    </div>
                    
                </div>

                <div className="sessions-container">
                    {user.length === 0 ? (
                        <div className="empty-state">         
                            <h3 className="empty-title">No sessions yet</h3>
                            <p className="empty-description">
                                Start your wellness journey by creating your first session
                            </p>
                            <Link to="/session-editor" className="create-session-btn">
                        <button>Create Your First Session</button>
                            </Link>
                        </div>
                    ) : (
                        <ul className="sessions-list">
                            {user.map((each) => (
                                <>
                                <EachSession key={each.id} each={each} deleteSession={this.deleteSession} className="session-card"/>
                                </>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            )
        );
    }
}

export default MySession;