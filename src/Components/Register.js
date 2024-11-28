import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/authSlice';
import './Auth.css';
import Swal from 'sweetalert2'
import Logo from '../shopping-cart.png';

function Register() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(''); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);
  const currentUser = useSelector(state => state.auth.currentUser);

  const handleRegister = () => {
    console.log('Handling register with:', email, password);
  
    if (password !== confirmPassword) {
      setLocalError('Passwords Do Not Match.');
      return;
    }
  
    if (!email || !password) {
      setLocalError('Please Fill In All Fields.');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to create a new account.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Register',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(register(email, password)); 
        Swal.fire('Success!', 'Your account has been created successfully.', 'success');
      } else {
        Swal.fire('Cancelled', 'Your registration has been cancelled.', 'info');
      }
    });
  };
  
  
  useEffect(() => {
    if (currentUser) {
      navigate('/login'); 
    } else if (error) {
      setLocalError(error);
    }
  }, [currentUser, error, navigate]);
  
  return (
    <div className="auth-container">
      <img src={Logo} alt="DaLogo" className="Logo"/>
      <h2>Register</h2>
      <input 
        type="email"
        placeholder="Email"
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        className="auth-input" 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Confirm Password"
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="auth-input"
      />
      {localError && <p className="auth-error">{localError}</p>}
      <button onClick={handleRegister} className="auth-button">Register</button>
      <button onClick={() => navigate('/login')} className="login-button">
        <b>Already have an account? <i>Login here</i></b>
      </button>
    </div>
  );
}

export default Register;