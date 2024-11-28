import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login} from '../redux/authSlice';
import Loader from './Loader'
import Swal from 'sweetalert2'
import './Auth.css';
import Logo from '../shopping-cart.png';

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authLoading = useSelector(state => state.auth.authLoading);
  const error = useSelector(state => state.auth.error);
  const currentUser = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    console.log('Current user in effect:', currentUser);
    console.log('Error in effect:', error);

    if (currentUser) {
      navigate('/shoppinglist');
    } else if (error) {
      setLocalError(error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'There was an issue with your login. Please try again.',
      });
    }
  }, [currentUser, error, navigate]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      });
    }
  }, [error]);

  const handleLogin = () => {
    console.log('Handling login with:', email, password);
    if (!email || !password) {
      setLocalError('Enter Both Email and Password.');
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please enter both email and password to log in.',
      });
      return;
    }
    dispatch(login(email, password)); 
    
    Swal.fire({
      title: 'Logging in...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const handleRegisterRedirect = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be redirected to the registration page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go to Register',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/register');
      }
    });
  };
  

  return (
    <div className="auth-container">
      <img src={Logo} alt='DaLogo' className='Logo'/>
      <h2>Login</h2>
      <input type="email" placeholder="Email" className="auth-input" 
        value={email} onChange={(e) => setEmail(e.target.value)}/> 
      <input type="password" placeholder="Password" className="auth-input"
        value={password} onChange={(e) => setPassword(e.target.value)}/>
      {localError && <p className="auth-error">{localError}</p>}
      <div className='buttons'>
        <button className='auth-button' onClick={handleLogin} disabled={authLoading}>
        {authLoading ? <Loader/> : 'Login'}</button>
        <button onClick={handleRegisterRedirect} className="login-button">
          <b>Don't have an Account? <i>Register here</i></b>
        </button>
      </div>
    </div>
  );
}

export default Login;
