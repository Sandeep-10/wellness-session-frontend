import { Component } from "react";
import {withRouter} from 'react-router-dom';    
import Cookies from 'js-cookie';
import './particularsession.css';
import Header from './header';
import {
    SpinnerLoader,
  } from '@akshay-bhalala/loaders';

class ParticularSession extends Component {
    state={
        session: {},
        isLoading: true,
    }
    
    componentDidMount() {
        this.getParticularSession();
    }

    getParticularSession = async () => {
        const {match} = this.props;
        const {id} = match.params;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        const response = await fetch(`http://localhost:5000/my-sessions/${id}`, options);
        const responseJson = await response.json();
        console.log(responseJson);
        if (response.ok) {
            this.setState({session: responseJson,isLoading: false});
        }
    }

    render() {
        const {session,isLoading} = this.state;
        console.log(session);
        const {title,json_file_url,status,created_at,tags} = session;
        return (
            isLoading ? (
                <div className="loader-container">
                    <SpinnerLoader color="#000000" height={80} width={80} />
                </div>
            ) : (
            <div className="particular-session-container">
                <Header />
                <div className="session-detail-card">
                    <div className="session-header">
                        <h1 className="session-title">{title || 'Untitled Session'}</h1>
                        <span className={`session-status-badge ${status === 'published' ? 'published' : ''}`}>
                            {status || 'Draft'}
                        </span>
                    </div>
                    
                    <div className="session-content">
                        <div className="session-info-grid">
                            <div className="info-card">
                                <div className="info-label">Created At</div>
                                <div className="info-value">{created_at || 'N/A'}</div>
                            </div>
                            
                            <div className="info-card">
                                <div className="info-label">Status</div>
                                <div className="info-value">{status || 'Draft'}</div>
                            </div>
                            
                            <div className="info-card">
                                <div className="info-label">JSON File URL</div>
                                <div className="info-value">
                                    {json_file_url}
                                </div>
                            </div>
                        </div>

                        {tags && (
                            <div className="tags-section">
                                <h3 className="tags-title">Tags</h3>
                                <div className="tags-container">
                                    {tags.split(',').map((tag, index) => (
                                        <span key={index} className="tag">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="session-actions">
                            <button className="action-btn btn-secondary" onClick={() => this.props.history.goBack()}>
                                 Back to Sessions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )
        );
    }
}   
export default withRouter(ParticularSession);