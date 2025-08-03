import { Component } from "react";
import { Link } from 'react-router-dom';
import './home.css';
import Header from './header';

class Home extends Component {
    render() {
        return (
            <div>
               <Header />
               <div className="home-container">
                    <div className="hero-section">
                        <h1 className="hero-title">Welcome to Wellness Sessions</h1>
                        <p className="hero-subtitle">Discover the power of mindful living and transform your daily routine</p>
                        <div className="cta-buttons">
                            <Link to="/my-sessions" className="cta-btn cta-btn-primary">
                                Explore Sessions
                            </Link>
                            <Link to="/session-editor" className="cta-btn cta-btn-primary">
                                Create Your Session
                            </Link>
                        </div>
                    </div>
                    <div className="features-section">
                        <h2 className="section-title">View Wellness Sessions</h2>
                        <p className="section-subtitle">Explore different types of wellness activities to enhance your mind, body, and spirit</p>
                        
                        <div className="features-grid">
                            <div className="feature-card">
                                <h3 className="feature-title">Yoga Sessions</h3>
                                <p className="feature-description">
                                    Improve flexibility, strength, and mental clarity through various yoga practices including Hatha, Vinyasa, and Restorative yoga.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3 className="feature-title">Meditation</h3>
                                <p className="feature-description">
                                    Find inner peace and reduce stress with guided meditation sessions, mindfulness practices, and breathing exercises.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3 className="feature-title">Fitness & Wellness</h3>
                                <p className="feature-description">
                                    Boost your energy and maintain a healthy lifestyle with cardio, strength training, and wellness coaching sessions.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3 className="feature-title">Mindfulness</h3>
                                <p className="feature-description">
                                    Develop awareness and presence through mindfulness practices, stress management, and emotional wellness techniques.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3 className="feature-title">Sleep & Relaxation</h3>
                                <p className="feature-description">
                                    Improve your sleep quality and learn relaxation techniques for better rest and recovery.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3 className="feature-title">Sound Therapy</h3>
                                <p className="feature-description">
                                    Experience healing through sound baths, music therapy, and vibrational healing sessions.
                                </p>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}

export default Home;    