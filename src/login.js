import {Component} from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import './login.css';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        emailError: false,
        passwordError: false
        
    }

    onChangePassword = (e) => {
        this.setState({password: e.target.value});
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const details = {email, password};

        if (email === '' && password === '') {
            this.setState({emailError: true, passwordError: true});
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

        const response = await fetch('http://localhost:5000/login', data);
        const responseJson = await response.json();
        console.log(responseJson);
        if (response.ok) {
            const jwtToken = responseJson.jwtToken;
            Cookies.set('jwt_token', jwtToken, {expires: 30});
            const {history} = this.props;
            console.log(history);
            history.replace('/');
        } else {
            this.setState({error: responseJson.error,emailError: false,passwordError: false});
        }
    }

    render() {
        const {email, password, error, emailError, passwordError} = this.state;
        return (
            <div className="login-container">
                <div className="login-form">
                    <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Login in to your account</p>
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
                            {emailError && <div className="error-messagee">Email is required</div>}
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
                            {passwordError && <div className="error-messagee">Password is required</div>}
                        </div>
                        
                        <div className="button-group">
                            <button type="submit" className="button button-primary">
                                Login
                            </button>
                            <Link to="/register" >
                                <button className="button button-secondary">Create Account</button>
                            </Link>
                        </div>
                        
                        {error && <div className="error-messagee">{error}</div>}
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;