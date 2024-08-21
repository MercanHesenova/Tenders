import { useFormik } from 'formik';
import React ,{ useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import '../assets/signUp.css';


const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(3, 'Too short!').max(10, 'Too long!').matches(/^[A-Za-zÇçƏəĞğIıİiÖöŞşÜü\s]+$/, 'Name can only contain letters'),
  surname: Yup.string().required('Required').min(5, 'Too short!').max(15, 'Too long!').matches(/^[A-Za-zÇçƏəĞğIıİiÖöŞşÜü\s]+$/, 'Surname can only contain letters'),
  email: Yup.string().email('Invalid email address').required('Required'),
  number: Yup.string().required('Required').matches(/^\+994\d{9}$/, 'Invalid phone number format').length(13, 'Phone number must be exactly 13 characters long'),
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


  const { values, handleChange, errors, handleSubmit, touched, setErrors } = useFormik({
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

      const existingUser = signupData.find(user =>
        user.email === values.email || user.number === values.number
      );

      if (existingUser) {
        if (existingUser.email === values.email) {
          setErrors({ email: 'This email is already used' });
        }
        if (existingUser.number === values.number) {
          setErrors({ number: 'This phone number is already used' });
        }
        return;
      }

      const newSignUpData = [...signupData, values]
      localStorage.setItem('signupData', JSON.stringify(newSignUpData));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', `${values.name} ${values.surname}`);
      setSignupData(newSignUpData)

      actions.resetForm();

      navigate('/sign-in')
    },
  });

  return (
    <>
    <div className='body'>
      <div className='signUpContainer'>
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
              <input type="text" id='number' placeholder='+99455 555 55 55' value={values.number} onChange={handleChange} />
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
          <div className='login-link'>
            <p>Already have an account?<Link to="/sign-in"> Login</Link></p>
            </div>
        </form>

      </div>
      </div>
    </>
  )
};

export default SignUp;
