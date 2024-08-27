import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import '../assets/signIn.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
        errorMessage: '',
        rememberMe: false,
        isModalOpen: false,
        modalEmail: '',
        newPassword: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        modalErrorMessage: ''
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
            if (state.newPassword == state.confirmPassword) {

                user.password = state.newPassword;


                localStorage.setItem('signupData', JSON.stringify(storedUsers));
                toast.success(`Password successfully reset for ${state.modalEmail}`);

                setState(prevState => ({
                    ...prevState,
                    password: '',
                    modalEmail: '',
                    newPassword: '',
                    confirmPassword: '',
                    // isModalOpen: false,
                    modalErrorMessage: ''
                }));

            } else {
                setState(prevState => ({
                    ...prevState,
                    modalErrorMessage: 'Passwords must match' 
                }));
            }
        } else {
            setState(prevState => ({
                ...prevState,
                modalErrorMessage: 'Email not found'
            }));
        }
    };

    const handleCloseModal = () => {
        setState(prevState => ({
            ...prevState,
            modalEmail: '',
            newPassword: '',
            confirmPassword: '',
            isModalOpen: false,
            modalErrorMessage: ''
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

    const toggleConfirmPasswordVisibility = () => {
        setState(prevState => ({
            ...prevState,
            showConfirmPassword: !prevState.showConfirmPassword
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
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={state.modalEmail}
                            onChange={handleChange('modalEmail')}
                            required
                        />
                        <div className='inputBoxSignIn'>
                            <input
                                type={state.showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={state.newPassword}
                                onChange={handleChange('newPassword')}
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className='modalIconBtn'>
                                {state.showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                            </button>
                        </div>

                        <div className='inputBoxSignIn'>
                            <input
                                type={state.showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                value={state.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                required
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className='modalIconBtn'>
                                {state.showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
                            </button>
                        </div>
                        {state.modalErrorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{state.modalErrorMessage}</p>}
                        <button type="submit" className='modalBtn'>Send</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;







