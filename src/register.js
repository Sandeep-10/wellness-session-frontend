import {Component} from 'react';
import {Link} from 'react-router-dom';
import './register.css';

class Register extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        message: '',
        emailError: false,
        passwordError: false
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    onChangePassword = (e) => {
        this.setState({password: e.target.value});
    }
    
    handleSubmit = async(e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const details = {email, password};
        if (email === '' && password === '') {
            this.setState({emailError:true ,passwordError:true});
            return;
        }
        else if (email === '') {
            this.setState({emailError: true,passwordError: false});
            return;
        }
        else if (password === '') {
            this.setState({passwordError: true,emailError: false});
            return;
        }

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        }       
        const response = await fetch('http://localhost:5000/login/register', data);
        const responseJson = await response.json();
        console.log(responseJson);
        if (response.ok) {
            this.setState({message: responseJson.message,error: ''});
        } else {
            this.setState({error: responseJson.error,emailError: false,passwordError: false,message: ''});
        }
    }

    render() {
        const {email, password, error, message, emailError, passwordError} = this.state;
        return (
            <div className="register-container">
                <div className="register-form">
                    <div className="register-header">
                        <h1>Create Account</h1>
                        <p>Join us today</p>
                    </div>
                    
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                onChange={this.onChangeEmail} 
                                value={email} 
                            />
                            {emailError && <div className="error-message">Email is required</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                onChange={this.onChangePassword} 
                                value={password} 
                            />
                            {passwordError && <div className="error-message">Password is required</div>}
                        </div>
                        
                        <div className="button-group">
                            <button type="submit" className="button button-primary">
                                Create Account
                            </button>
                            
                            <Link to="/login" className="button button-secondary">
                                Sign In
                            </Link>
                        </div>
                        
                        {error && <div className="error-message">{error}</div>}
                        {message && <div className="success-message">{message}</div>}
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;