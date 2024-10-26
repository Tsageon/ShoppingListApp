import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/authSlice';
import { FaAppleAlt, FaCarrot, FaCheese, FaBreadSlice, FaDrumstickBite, FaSeedling, FaPepperHot } from 'react-icons/fa'; 
import { addItem, removeItem, updateItem, toggleChecked, addList,initializeLists } from '../redux/shoppinglistSlice';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaUndo, FaSearch, FaCube, FaSignOutAlt } from 'react-icons/fa'; 
import './ShoppingList.css';


const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    const key = item.replace('./', '').replace(/\.[^/.]+$/, '');
    images[key] = r(item);
  });
  return images;
};

const categoryIcons = {
  Fruit: <FaAppleAlt color="#FF6347" />,       
  Vegetable: <FaCarrot color="#FFA500" />,    
  Dairy: <FaCheese color="#FFD700" />,         
  Bakery: <FaBreadSlice color="#D2691E" />,    
  Meat: <FaDrumstickBite color="#DC143C" />,   
  Cereals: <FaSeedling color="#32CD32" />,     
  Spices: <FaPepperHot color="#FF4500" />      
};

const categoryImages = importAll(require.context('../categoryImages', false, /\.(png|jpe?g|svg)$/));

console.log('Category Images:', categoryImages);

const predefinedCategories = ['Fruit', 'Vegetable', 'Dairy', 'Bakery', 'Meat', 'Cereals', 'Spices'];

function ShoppingList() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const authLoading = useSelector(state => state.auth.loading);
  const lists = useSelector(state => state.shoppingList.lists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    itemName: '',
    quantity: '',
    notes: '',
    category: '',
    isCustomCategory: false,
    editItemId: null,
    editedItem: {}
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lists.length === 0) {
      dispatch(addList({ id: 1, items: [] }));
    }
  }, [lists, dispatch]);

  useEffect(() => {
    if (!authLoading) {
      if (currentUser) {
        navigate('/shoppinglist');
      } else if (!currentUser && window.location.pathname !== '/register') {
        navigate('/login');
      }
    }
  }, [currentUser, authLoading, navigate]);
  

  console.log('Current User:', currentUser);
  console.log('Auth Loading:', authLoading);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('shoppingLists'));
    if (storedLists) {
      dispatch(initializeLists(storedLists));
    }
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (name === 'category') {
      setFormState(prev => ({ ...prev, isCustomCategory: value === 'custom' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { itemName, quantity, category } = formState;

    if (!itemName.trim()) newErrors.itemName = 'Item Name Is Required.';
    if (!quantity.trim() || isNaN(quantity) || quantity < 1) newErrors.quantity = 'Enter a valid quantity.';
    if (formState.isCustomCategory && !category.trim()) {
      newErrors.category = 'Category is required when using Custom category.';
    } else if (!formState.isCustomCategory && !predefinedCategories.includes(category)) {
      newErrors.category = 'Invalid Category.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newItem = {
        id: formState.editItemId || Date.now(),
        name: formState.itemName,
        quantity: formState.quantity,
        checked: false,
        category: formState.category,
        notes: formState.notes
      };
      if (formState.editItemId) {
        dispatch(updateItem({ listId: lists[0].id, itemId: formState.editItemId, updatedItem: newItem }));
      } else {
        dispatch(addItem({ listId: lists[0].id, item: newItem }));
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormState({
      itemName: '',
      quantity: '',
      notes: '',
      category: '',
      isCustomCategory: false,
      editItemId: null,
      editedItem: {}
    });
    setErrors({});
  };

  const handleToggleChecked = (itemId) => {
    dispatch(toggleChecked({ listId: lists[0].id, itemId }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem({ listId: lists[0].id, itemId }));
  };

  const filteredItems = lists[0]?.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!formState.category || item.category.toLowerCase() === formState.category.toLowerCase())
  ) || [];

  if (authLoading) return <div>Loading...</div>;

  return (
    <div className="shopping-list-container">
      <div className="header">
  <h3 className="shopping-list-title">Shopping List</h3>
  <button className="logout-button" onClick={handleLogout}>
    <FaSignOutAlt /> Logout
  </button>
</div>

      
      <div className="search-container">
        <input 
          className="search-input" 
          type="text" 
          placeholder="Search For items"
          value={searchTerm}  
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => {}}>
          <FaSearch /> Search
        </button>
      </div>
      
      <div className="form-container">
        <input 
          className="item-input" 
          name="itemName"
          placeholder="Enter Item Name"
          value={formState.itemName} 
          onChange={handleInputChange}
        />
        {errors.itemName && <p className="error">{errors.itemName}</p>}
        
        <input 
          className="quantity-input" 
          name="quantity"
          type="text"  
          placeholder="Enter quantity"
          value={formState.quantity}
          onChange={handleInputChange}
        />
        {errors.quantity && <p className="error">{errors.quantity}</p>}
        
        {formState.isCustomCategory ? (
          <input  
            className="category-input"  
            name="category"
            placeholder="Enter category" 
            type="text"
            value={formState.category} 
            onChange={handleInputChange}
          />
        ) : (
          <select  
            className="category-select"
            name="category"
            value={formState.category} 
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            {predefinedCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
        )}
        {errors.category && <p className="error">{errors.category}</p>}

        <textarea 
          className="notes-textarea"  
          placeholder="Enter Notes"
          name="notes"
          value={formState.notes} 
          onChange={handleInputChange}
        />
        
        <button className="add-button" onClick={handleSubmit}>
          <FaPlus /> {formState.editItemId ? 'Update Item' : 'Add Item'}
        </button>
      </div>

   
     {filteredItems.length > 0 && (
      <table className="item-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id} className={item.checked ? 'checked-row' : 'unchecked-row'}>
            <td>
  {categoryIcons[item.category] || categoryIcons['Custom']}
</td>

              <td>{item.name}</td>
              <td>
  {Array.from({ length: item.quantity }).map((_, index) => (
    <FaCube key={index} className="quantity-icon" />
  ))}
</td>
              <td>
                <button onClick={() => handleToggleChecked(item.id)}>
                  {item.checked ? <FaUndo /> : <FaCheck />}
                </button>
                <button onClick={() => setFormState({ ...formState, ...item, editItemId: item.id })}>
                  <FaEdit />
                </button>
                <button onClick={() => handleRemove(item.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default ShoppingList;