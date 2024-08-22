import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();

  const addItem = () => {
    if (inputValue.trim() !== '') {
      dispatch({ type: 'ADD_ITEM', payload: inputValue});
      setInputValue('');}};

  const removeItem = (index) => {
    dispatch({type: 'REMOVE_ITEM',payload: index});
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <input type="text" placeholder="Enter the thing"
        value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      <button onClick={addItem}>Add The Item</button>
      <ul>{items.map((item, index) => (
          <li key={index}>{item}
          <button onClick={() => removeItem(index)}>Delaware</button>
          </li>
        ))}
     </ul>
    </div>
  );
}

export default App;