import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/authSlice';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import PrivacyPolicy from './Components/PrivacyPolicy';
import ShoppingList from './Components/ShoppingList';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {

  const dispatch = useDispatch(); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);



  return (
   <Router>
    <Routes>
    <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
    </Routes>
    </Router>
  );
}

export default App;