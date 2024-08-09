import { useFormik } from 'formik';
import React ,{ useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './SignUp.css';


const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(3, 'Too short!').max(10, 'Too long!').matches(/^[A-Za-z]+$/, 'Name can only contain letters'),
  surname: Yup.string().required('Required').min(5, 'Too short!').max(15, 'Too long!').matches(/^[A-Za-z]+$/, 'Name can only contain letters'),
  email: Yup.string().email('Invalid email address').required('Required'),
  number: Yup.string().required('Required').matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').length(10, 'Phone number must be exactly 10 digits long'),
  password: Yup.string().min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState([]);


  useEffect(() => {
    const localSignup = JSON.parse(localStorage.getItem("signupData")) || [];

    if (Array.isArray(localSignup)) {
      setSignupData(localSignup);
    } else {
      setSignupData([]);
    }
  }, []);


  const { values, handleChange, errors, handleSubmit, touched } = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      const newSignUpData = [...signupData, values]
      localStorage.setItem('signupData', JSON.stringify(newSignUpData));
      setSignupData(newSignUpData)

      actions.resetForm();

      navigate('/signIn')
    },
  });

  return (
    <>
      <div className='container'>
        <div className='title'>Sign Up</div>
        <form onSubmit={handleSubmit}>
          <div className='user-details'>
            <div className='input-wrapper'>
              <label htmlFor="name" className='details'>Name</label>
              <input type="text" id='name' placeholder='enter your name' value={values.name} onChange={handleChange} />
              {touched.name && errors.name && <div className='error' style={{color: 'red'}}> {errors.name}</div>}
            </div>

            <div className='input-wrapper'>
              <label htmlFor="surname" className='details'>Surname</label>
              <input type="text" id='surname' placeholder='enter your surname' value={values.surname} onChange={handleChange} />
              {touched.surname && errors.surname && <div className='error' style={{color: 'red'}}> {errors.surname}</div>}
            </div>

            <div className='input-wrapper'>
              <label htmlFor="email" className='details'>Email</label>
              <input type="email" id='email' placeholder='enter your email' value={values.email} onChange={handleChange} />
              {touched.email && errors.email && <div className='error' style={{color: 'red'}}> {errors.email}</div>}
            </div>

            <div className='input-wrapper'>
              <label htmlFor="number" className='details'>Phone Number</label>
              <input type="text" id='number' placeholder='enter your number' value={values.number} onChange={handleChange} />
              {touched.number && errors.number && <div className='error' style={{color: 'red'}}> {errors.number}</div>}
            </div>

            <div className='input-wrapper'>
              <label htmlFor="password" className='details'>Password</label>
              <input type="password" id='password' placeholder='enter your password' value={values.password} onChange={handleChange} />
              {touched.password && errors.password && <div className='error'style={{color: 'red'}}> {errors.password}</div>}
            </div>

            <div className='input-wrapper'>
              <label htmlFor="confirmPassword" className='details'>Confirm Password</label>
              <input type="password" id='confirmPassword' placeholder='confirm your password' value={values.confirmPassword} onChange={handleChange} />
              {touched.confirmPassword && errors.confirmPassword && <div className='error'style={{color: 'red'}}> {errors.confirmPassword}</div>}
            </div>
            
            <div className='button'>
              <button type='submit'>Create an account</button>
            </div>
          </div>
        </form>

      </div>
    </>
  )
};

export default SignUp;
