import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/signIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEmail, setModalEmail] = useState('');
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

    const handleForgotPassword = (event) => {
        event.preventDefault(); 
        setIsModalOpen(true);
    };

    const handleModalSubmit = (event) => {
        event.preventDefault();

        const storedUsers = JSON.parse(localStorage.getItem('signupData')) || [];
        const user = storedUsers.find(user => user.email == modalEmail);

        if (user) {
            alert(`Password reset link sent to ${modalEmail}`);
        } else {
            alert('Email not found');
        }

        setModalEmail('');
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {

        setModalEmail('');
        setIsModalOpen(false);
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
                            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/> Remember me
                        </label>
                        <a onClick={handleForgotPassword}>Forgot password?</a>
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

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={handleCloseModal}>&times;</span>
                        <h2>Password Reset</h2>
                        <form onSubmit={handleModalSubmit}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                value={modalEmail} 
                                onChange={(e) => setModalEmail(e.target.value)} 
                                required 
                            />
                            <button type="submit" className='modalBtn'>Send</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignIn;
