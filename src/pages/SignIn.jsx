import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/signIn.css';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        const storedUsers = JSON.parse(localStorage.getItem('signupData')) || [];
        
       
        const existingUser = storedUsers.find(user => user.email == email && user.password == password);

        if (existingUser) {
            navigate('/tender-create'); 
        } else {
            setErrorMessage('User not found or incorrect password'); 
        }
    };

    return (
        <div className='wrapper'>
            <div className='SignInContainer'>
                
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                    <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>   
                    </div>

                    <div className='input-box'>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>   
                    </div>

                    <div className='remember-forgot'>
                        <label>
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <div className='loginBtn'>
              <button type='submit'>Login</button>
            </div>

                {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}


                    <div className='register-link'>
                        <p>Don't have an account? <Link to="/sign-up">Register now!</Link></p>
                    </div>

                    
                </form>

            </div>
        </div>
    );
};

export default SignIn;
