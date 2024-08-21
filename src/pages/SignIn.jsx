import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/signIn.css';

const SignIn = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
        errorMessage: '',
        rememberMe: false, 
        isModalOpen: false,
        modalEmail: ''
    });

    const handleLogin = (event) => {
        event.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('signupData')) || [];
        const existingUser = storedUsers.find(user => user.email == state.email && user.password == state.password);

        if (existingUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', `${existingUser.name} ${existingUser.surname}`);
            window.location.href = '/tender-create';
        } else {
            setState(prevState => ({
                ...prevState,
                errorMessage: 'User not found or incorrect password'
            }));
        }
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        setState(prevState => ({
            ...prevState,
            isModalOpen: true
        }));
    };

    const handleModalSubmit = (event) => {
        event.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('signupData')) || [];
        const user = storedUsers.find(user => user.email == state.modalEmail);

        if (user) {
            alert(`Password reset link sent to ${state.modalEmail}`);
        } else {
            alert('Email not found');
        }

        setState(prevState => ({
            ...prevState,
            modalEmail: '',
            isModalOpen: false
        }));
    };

    const handleCloseModal = () => {
        setState(prevState => ({
            ...prevState,
            modalEmail: '',
            isModalOpen: false
        }));
    };

    const handleChange = (key) => (event) => {
        setState(prevState => ({
            ...prevState,
            [key]: event.target.value
        }));
    };

    const handleCheckboxChange = (event) => {
        setState(prevState => ({
            ...prevState,
            rememberMe: event.target.checked
        }));
    };

    return (
        <div className='wrapper'>
            <div className='SignInContainer'>
                <form onSubmit={handleLogin}>
                    <h1>Welcome Back</h1>
                    <p className='login-paraghraph'>Enter your credential to login</p>
                    <div className='input-box'>
                        <input type="text" placeholder="Email" required value={state.email} onChange={handleChange('email')}/>
                    </div>
                    <div className='input-box'>
                        <input type="password" placeholder="Password" value={state.password} onChange={handleChange('password')}/>
                    </div>
                    <div className='remember-forgot'>
                        <label>
                            <input type="checkbox" checked={state.rememberMe} onChange={handleCheckboxChange}/> Remember me
                        </label>
                        <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
                    </div>
                    <div className='loginBtn'>
                        <button type='submit'>Login</button>
                    </div>
                    {state.errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{state.errorMessage}</p>}
                    <div className='register-link'>
                        <p>Don't have an account? <Link to="/sign-up">Register now!</Link></p>
                    </div>
                </form>
            </div>

            <div className={`overlay ${state.isModalOpen ? 'show' : ''}`}></div>
            <div className={`modal ${state.isModalOpen ? 'show' : ''}`}>
                <div className='modal-content'>
                    <span className='close' onClick={handleCloseModal}>&times;</span>
                    <h2>Password Reset</h2>
                    <form onSubmit={handleModalSubmit}>
                        <input type="email" placeholder="Enter your email" value={state.modalEmail} onChange={handleChange('modalEmail')} required/>
                        <button type="submit" className='modalBtn'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
