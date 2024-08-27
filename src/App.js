import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ShoppingList from './Components/ShoppingList';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/Shoppinglist" element={<ShoppingList/>}/>
    </Routes>
    </Router>
  );
}

export default App;