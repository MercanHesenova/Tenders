import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import '../assets/signIn.css';

const SignIn = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
        errorMessage: '',
        rememberMe: false,
        isModalOpen: false,
        modalEmail: '',
        showPassword: false
    })

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail') || ''
        const savedPassword = localStorage.getItem('savedPassword') || ''
        const rememberMe = localStorage.getItem('rememberMe') == 'true'

        setState(prevState => ({
            ...prevState,
            email: savedEmail,
            password: savedPassword,
            rememberMe: rememberMe
        }));

    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('signupData')) || [];
        const existingUser = storedUsers.find(user => user.email == state.email && user.password == state.password);

        if (existingUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', `${existingUser.name} ${existingUser.surname}`);
            localStorage.setItem('currentUser', JSON.stringify(existingUser));

            if (state.rememberMe) {
                localStorage.setItem('savedEmail', state.email);
                localStorage.setItem('savedPassword', state.password);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
                localStorage.removeItem('rememberMe');
            }

            window.location.href = '/tender-create';

        } else {
            setState(prevState => ({
                ...prevState,
                errorMessage: 'User not found or incorrect password'
            }));
        }
    };

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            setState(prevState => ({
                ...prevState,
                email: parsedUser.email
            }));
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/sign-in'; // Çıkıştan sonra yönlendirme
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

    const togglePasswordVisibility = () => {
        setState(prevState => ({
            ...prevState,
            showPassword: !prevState.showPassword
        }));
    };

    return (
        <div className='wrapper'>
            <div className='SignInContainer'>
                <form onSubmit={handleLogin}>
                    <h1>Welcome Back!</h1>
                    <p className='login-paraghraph'>Enter your credential to login</p>
                    <div className='inputBoxSignIn'>
                        <input type="text" placeholder="Email" required value={state.email} onChange={handleChange('email')} />
                    </div>
                    <div className='inputBoxSignIn'>
                        <input
                            type={state.showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange('password')}
                        />
                        <button type="button" onClick={togglePasswordVisibility} className='icon-button'>
                            {state.showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                        </button>
                    </div>
                    <div className='remember-forgot'>
                        <label>
                            <input type="checkbox" checked={state.rememberMe} onChange={handleCheckboxChange} /> Remember me
                        </label>
                        <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
                    </div>
                    <div className='loginBtn'>
                        <button type='submit'>Login</button>
                    </div>
                    {state.errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '30px' }}>{state.errorMessage}</p>}
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
                        <input type="email" placeholder="Enter your email" value={state.modalEmail} onChange={handleChange('modalEmail')} required />
                        <button type="submit" className='modalBtn'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
