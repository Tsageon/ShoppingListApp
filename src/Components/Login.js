import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login} from '../redux/authSlice';
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
    }
  }, [currentUser, error, navigate]);

  useEffect(() => {
    if (error) {
      setLocalError(error); 
    }
  }, [error]);

  const handleLogin = () => {
    console.log('Handling login with:', email, password); 
    if (!email || !password) {
      setLocalError('Enter Both Email and Password.'); 
      return;
    }
    dispatch(login(email, password)); 
  };  

  const handleRegisterRedirect = () => {
    navigate('/register');
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
        {authLoading ? 'Loading...' : 'Login'}</button>
        <button onClick={handleRegisterRedirect} className="login-button">
          <b>Don't have an Account? <i>Register here</i></b>
        </button>
      </div>
    </div>
  );
}

export default Login;
