import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItem, toggleChecked, addList } from '../redux/shoppingListSlice';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaUndo, FaSearch, FaCube } from 'react-icons/fa';
import './ShoppingList.css';
import Dairy from '../milk.png';
import Vegetable from '../vegetable.png';
import Meat from '../proteins.png';
import Bakery from '../bread.png';
import Fruit from '../harvest.png';
import Spices from '../spices.png';
import Cereals from '../cereals.png';
import Custom from '../service.png';

const predefinedCategories = [
  'Fruit', 'Vegetable', 'Dairy', 'Bakery', 'Meat', 'Cereals', 'Spices'
];

const categoryImages = {
  Fruit: Fruit,
  Vegetable: Vegetable,
  Dairy: Dairy,
  Bakery: Bakery,
  Meat: Meat,
  Cereals: Cereals,
  Spices: Spices,
  Custom: Custom,
};

function ShoppingList() {
  const [inputValue, setInputValue] = useState('');
  const [inputQuantity, setInputQuantity] = useState('');
  const [inputNotes, setInputNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState('');
  const [editedItemQuantity, setEditedItemQuantity] = useState('');
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

  const filteredItems = items
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category ? item.category.toLowerCase() === category.toLowerCase() : true)
    );

  const validate = () => {
    const newErrors = {};
    if (!inputValue.trim()) {
      newErrors.inputValue = 'Item Name Is Required.';
    }
    if (!inputQuantity.trim() || isNaN(inputQuantity) || inputQuantity < 1) {
      newErrors.inputQuantity = 'Enter a valid quantity.';
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
      const newItem = {
        id: Date.now(),
        name: inputValue,
        quantity: inputQuantity,
        checked: false,
        category,
        notes: inputNotes
      };
      console.log('Adding Item:', newItem);
      dispatch(addItem({ listId, item: newItem }));
      setInputValue('');
      setInputQuantity('');
      setInputNotes('');
      setCategory('');
      setIsCustomCategory(false);
      setErrors({});
    }
  };

  const handleEdit = (itemId, name, quantity, category, notes) => {
    setEditItemId(itemId);
    setEditedItemName(name);
    setEditedItemQuantity(quantity);
    setCategory(category);
    setIsCustomCategory(!predefinedCategories.includes(category));
    setEditedItemNotes(notes);
  };

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
      setEditedItemQuantity('');
      setEditedItemNotes('');
      setCategory('');
      setIsCustomCategory(false);
      setErrors({});
    }
  };

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
    }
  };

  const renderQuantityIcons = (quantity) => {
    const numQuantity = parseInt(quantity, 10);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      return <span>Invalid quantity</span>;
    }
  
    const icons = [];
    for (let i = 0; i < numQuantity; i++) {
      icons.push(<FaCube key={i} className="quantity-icon" />);
    }
  
    return <div>{icons}</div>;
  };

  return (
    <div className="shopping-list-container">
      <h3 className="shopping-list-title">Shopping List</h3>
      <div className="search-container">
        <input className="search-input" type="text"
          placeholder="Search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="search-button" onClick={() => {}}>
          <FaSearch /> Search
        </button>
      </div>
      <div className="form-container">
        <input className="item-input" placeholder="Enter item name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        {errors.inputValue && <p className="error">{errors.inputValue}</p>}
        <input className="quantity-input"
          type="text"
          placeholder="Enter quantity"
          value={inputQuantity}
          onChange={(e) => setInputQuantity(e.target.value)} />
        {errors.inputQuantity && <p className="error">{errors.inputQuantity}</p>}
        {isCustomCategory ? (
          <input className="category-input" placeholder="Enter category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)} />
        ) : (
          <select className="category-select"
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
          onChange={(e) => setInputNotes(e.target.value)} />
        {errors.category && <p className="error">{errors.category}</p>}
        <button className="add-button" onClick={handleAdd}>
          <FaPlus /> Add Item
        </button>
      </div>
      {editItemId ? (
        <div className="edit-form-container">
          <input className="item-input" placeholder="Edit item name"
            value={editedItemName}
            onChange={(e) => setEditedItemName(e.target.value)} />
          {errors.inputValue && <p className="error">{errors.inputValue}</p>}
          <input className="quantity-input" placeholder="Enter quantity"
            type="text"
            value={editedItemQuantity}
            onChange={(e) => setEditedItemQuantity(e.target.value)} />
          {errors.inputQuantity && <p className="error">{errors.inputQuantity}</p>}
          <textarea
            className="notes-textarea"
            value={editedItemNotes}
            onChange={(e) => setEditedItemNotes(e.target.value)}
            placeholder="Edit optional notes" />
          {isCustomCategory ? (
            <input className="category-input" placeholder="Edit category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)} />
          ) : (
            <select className="category-select"
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
            <FaEdit /> Update Item
          </button>
        </div>
      ) : null}

      <table className="shopping-list-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id} className={`shopping-item ${item.checked ? 'checked' : ''}`}>
              <td><img src={categoryImages[item.category] || categoryImages['Custom']}alt={item.category} className="category-image"/></td>
              <td>{item.name}</td>
              <td>{renderQuantityIcons(item.quantity)}</td>
              <td>{item.notes}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(item.id, item.name, item.quantity, item.category, item.notes)}>
                <FaEdit/>Edit
                </button>
                <button className="check-button" onClick={() => handleToggleChecked(item.id)}>
              {item.checked ? <FaUndo /> : <FaCheck/>}  Check 
                </button>
                <button className="delete-button" onClick={() => handleRemove(item.id)}>
                  <FaTrash />Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingList;
