import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();

  const addItem = () => {
    if (inputValue.trim() !== '') {
      if (editIndex !== null) {
        dispatch({ type: 'UPDATE_ITEM', payload: { index: editIndex, newName: inputValue } });
        setEditIndex(null);
      } else {
        dispatch({ type: 'ADD_ITEM', payload: inputValue });
      }
      setInputValue('');}};

  const removeItem = (index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });};

  const checkoutItem = (index) => {
    dispatch({ type: 'CHECKOUT_ITEM', payload: index });};

  const editItem = (index) => {
    setInputValue(items[index].name);
    setEditIndex(index);};

  return (
    <div>
      <h1>Shopping List</h1>
      <input type="text" placeholder="Enter the thing"
      value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      <button onClick={addItem}>
        {editIndex !== null ? 'Update Item' : 'Add Item'}
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span style={{textDecoration: item.checkedOut ? 'line-through' : 'none',}}>{item.name}
            </span>
            <button onClick={() => removeItem(index)}>Delete</button>
            <button onClick={() => editItem(index)}>Edit</button>
            <button onClick={() => checkoutItem(index)} disabled={item.checkedOut}>
              {item.checkedOut ? 'Checked Out' : 'Check Out'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;