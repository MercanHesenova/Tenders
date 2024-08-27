
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import '../assets/signIn.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
    });

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail') || '';
        const savedPassword = localStorage.getItem('savedPassword') || '';
        const rememberMe = localStorage.getItem('rememberMe') === 'true';

        setState(prevState => ({
            ...prevState,
            email: savedEmail,
            password: savedPassword,
            rememberMe: rememberMe
        }));
    }, []);

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

    const handleCloseModal = () => {
        setState(prevState => ({
            ...prevState,
            isModalOpen: false,
            modalErrorMessage: ''
        }));
    };

    const modalValidationSchema = Yup.object({
        modalEmail: Yup.string().email('Invalid email address').required('required'),
        newPassword: Yup.string().min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Required'),
    });

    const handleModalSubmit = (values, { resetForm }) => {
        const storedUsers = JSON.parse(localStorage.getItem('signupData')) || [];
        const user = storedUsers.find(user => user.email === values.modalEmail);

        if (user) {
            user.password = values.newPassword;
            localStorage.setItem('signupData', JSON.stringify(storedUsers));
            toast.success(`Password successfully reset for ${values.modalEmail}`);

            if (state.rememberMe) {
                setState(prevState => ({
                    ...prevState,
                    password: values.newPassword
                }));
                localStorage.setItem('savedPassword', values.newPassword);
            }

            resetForm();
            // handleCloseModal();


        } else {
            setState(prevState => ({
                ...prevState,
                modalErrorMessage: 'Email not found'
            }));
        }
    };

    return (
        <div className='wrapper'>
            <div className='SignInContainer'>
                <form onSubmit={handleLogin}>
                    <h1>Welcome Back!</h1>
                    <p className='login-paraghraph'>Enter your credential to login</p>
                    <div className='inputBoxSignIn'>
                        <input type="text" placeholder="Email" required value={state.email} onChange={(e) => setState(prevState => ({ ...prevState, email: e.target.value }))} />
                    </div>
                    <div className='inputBoxSignIn'>
                        <input
                            type={state.showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => setState(prevState => ({ ...prevState, password: e.target.value }))}
                        />
                        <button type="button" onClick={() => setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }))} className='icon-button'>
                            {state.showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                        </button>
                    </div>
                    <div className='remember-forgot'>
                        <label>
                            <input type="checkbox" checked={state.rememberMe} onChange={(e) => setState(prevState => ({ ...prevState, rememberMe: e.target.checked }))} /> Remember me
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
                    <Formik
                        initialValues={{ modalEmail: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={modalValidationSchema}
                        onSubmit={handleModalSubmit}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                <Field
                                    type="email"
                                    name="modalEmail"
                                    placeholder="Enter your email"
                                    value={values.modalEmail}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="modalEmail" component="div" style={{ color: 'red', textAlign: 'center' }} />

                                <div className='inputBoxSignIn'>
                                    <Field
                                        type={state.showPassword ? 'text' : 'password'}
                                        name="newPassword"
                                        placeholder="New Password"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                    />
                                    <button type="button" onClick={() => setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }))} className='modalIconBtn'>
                                        {state.showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                    </button>
                                </div>
                                <ErrorMessage name="newPassword" component="div" style={{ color: 'red', textAlign: 'center' }} />

                                <div className='inputBoxSignIn'>
                                    <Field
                                        type={state.showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button type="button" onClick={() => setState(prevState => ({ ...prevState, showConfirmPassword: !prevState.showConfirmPassword }))} className='modalIconBtn'>
                                        {state.showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                    </button>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red', textAlign: 'center' }} />

                                {state.modalErrorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{state.modalErrorMessage}</p>}
                                <button type="submit" className='modalBtn'>Send</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;





