import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItem, toggleChecked, addList } from '../redux/shoppingListSlice';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaUndo, FaSearch } from 'react-icons/fa';
import './ShoppingList.css';

const predefinedCategories = [
  'Fruit', 'Vegetable', 'Dairy', 'Bakery', 'Meat', 'Cereals', 'Spices', 'Other'
];

function ShoppingList() {
  const [inputValue, setInputValue] = useState('');
  const [inputQuantity, setInputQuantity] = useState(0);
  const [inputNotes, setInputNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState('');
  const [editedItemQuantity, setEditedItemQuantity] = useState(1);
  const [editedItemNotes, setEditedItemNotes] = useState('');
  const [category, setCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [errors, setErrors] = useState({});

  const lists = useSelector(state => state.shoppingList.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lists.length === 0) {
      dispatch(addList({ id: 1, items: [] }));
    }
  }, [lists, dispatch]);

  const listId = lists.length > 0 ? lists[0].id : null;
  const items = listId ? lists.find(list => list.id === listId)?.items || [] : [];

  const validate = () => {
    const newErrors = {};
    if (!inputValue.trim()) {
      newErrors.inputValue = 'Item Name Is Required.';
    }
    if (inputQuantity < 1) {
      newErrors.inputQuantity = 'Quantity Must Be At Least 1.';
    }
    if (isCustomCategory && !category.trim()) {
      newErrors.category = 'Category is required when using Custom category.';
    } else if (!isCustomCategory && !predefinedCategories.includes(category)) {
      newErrors.category = 'Invalid Category.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (validate()) {
      dispatch(addItem({
        listId,
        item: {
          id: Date.now(),
          name: inputValue,
          quantity: inputQuantity,
          checked: false,
          category,
          notes: inputNotes
        }
      }));
      setInputValue('');
      setInputQuantity(1);
      setInputNotes('');
      setCategory('');
      setIsCustomCategory(false);
      setErrors({});
    }};

  const handleEdit = (itemId, name, quantity, category, notes) => {
    setEditItemId(itemId);
    setEditedItemName(name);
    setEditedItemQuantity(quantity);
    setCategory(category);
    setIsCustomCategory(!predefinedCategories.includes(category));
    setEditedItemNotes(notes); };

  const handleUpdate = () => {
    if (validate()) {
      dispatch(updateItem({
        listId,
        itemId: editItemId,
        updatedItem: {
          id: editItemId,
          name: editedItemName,
          quantity: editedItemQuantity,
          checked: false,
          category,
          notes: editedItemNotes 
        }
      }));
      setEditItemId(null);
      setEditedItemName('');
      setEditedItemQuantity(1);
      setEditedItemNotes('');
      setCategory('');
      setIsCustomCategory(false);
      setErrors({});
    }};

  const handleToggleChecked = (itemId) => {
    dispatch(toggleChecked({ listId, itemId }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem({ listId, itemId }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomCategory(true);
      setCategory('');
    } else {
      setIsCustomCategory(false);
      setCategory(value);
    }};

  const filteredItems = items
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category ? item.category.toLowerCase() === category.toLowerCase() : true));

  return (
    <div className="shopping-list-container">
      <h3 className="shopping-list-title">Shopping List</h3>
      <div className="search-container">
        <input  className="search-input" type="text"
          placeholder="Search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className="search-button" onClick={() => {}}>
          <FaSearch/>Search
        </button>
      </div>
      <div className="form-container">
        <input className="item-input" placeholder="Enter item name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}/>
        {errors.inputValue && <p className="error">{errors.inputValue}</p>}
        <input className="quantity-input"
          type="number" min="1"
          value={inputQuantity}
          onChange={(e) => setInputQuantity(parseInt(e.target.value, 10) || 1)}/>
        {errors.inputQuantity && <p className="error">{errors.inputQuantity}</p>}
        {isCustomCategory ? (
          <input className="category-input" placeholder="Enter category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}/>
        ) : (
          <select  className="category-select"
            value={category} 
            onChange={handleCategoryChange}>
            <option value="">Select category</option>
            {predefinedCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
        )}
          <textarea className="notes-textarea" placeholder="Enter optional notes"
          value={inputNotes}
          onChange={(e) => setInputNotes(e.target.value)}/>
        {errors.category && <p className="error">{errors.category}</p>}
        <button className="add-button" onClick={handleAdd}>
          <FaPlus/> Add Item</button>
      </div>
      {editItemId ? (
        <div className="edit-form-container">
          <input  className="item-input" placeholder="Edit item name"
            value={editedItemName}
            onChange={(e) => setEditedItemName(e.target.value)}/>
          {errors.inputValue && <p className="error">{errors.inputValue}</p>}
          <input  className="quantity-input" placeholder='Quantity'
            type="number"
            min="1" 
            value={editedItemQuantity}
            onChange={(e) => setEditedItemQuantity(parseInt(e.target.value, 10) || 1)}/>
          {errors.inputQuantity && <p className="error">{errors.inputQuantity}</p>}
          <textarea
            className="notes-textarea"
            value={editedItemNotes}
            onChange={(e) => setEditedItemNotes(e.target.value)}
            placeholder="Edit optional notes"/>
          {isCustomCategory ? (
            <input className="category-input" placeholder="Edit category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}/>
          ) : (
            <select  className="category-select"
              value={category}
              onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {predefinedCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="custom">Custom</option>
            </select>
          )}
          {errors.category && <p className="error">{errors.category}</p>}
          <button className="update-button" onClick={handleUpdate}>
            <FaEdit/>Update Item</button>
        </div>
      ) : null}
      <ul className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <li key={item.id} className="item-list-item">
              <span className={`item-text ${item.checked ? 'checked' : ''}`}>
                {item.name} (Quantity: {item.quantity}, Category: {item.category}, Notes: {item.notes})
              </span>
              <button className="toggle-check-button" onClick={() => handleToggleChecked(item.id)}>
                Check {item.checked ? <FaUndo /> : <FaCheck />}
              </button>
              <button className="edit-button" onClick={() => handleEdit(item.id, item.name, item.quantity, item.category, item.notes)}>
                <FaEdit/>Edit</button>
              <button className="delete-button" onClick={() => handleRemove(item.id)}>
                <FaTrash/>Delete</button>
            </li>
          ))
        ) : (
          <li><i>No Items Yet</i></li>
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;