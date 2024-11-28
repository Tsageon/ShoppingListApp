import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaUndo, FaCube} from 'react-icons/fa';
import './ItemCard.css';
import Custom from '../service.png';
import Swal from 'sweetalert2';

const ItemCard = ({
  item,
  categoryImages,
  onEdit,
  onToggleChecked,
  onRemove }) => {

    const renderQuantityIcons = (quantity) => {
      const numQuantity = parseInt(quantity, 10);
      
      if (isNaN(numQuantity) || numQuantity <= 0) {
        Swal.fire({
          title: 'Invalid Quantity',
          text: 'The quantity you entered is not valid. Please enter a valid number greater than 0.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        
        return <span>Invalid quantity</span>;
      }

    const icons = [];
    for (let i = 0; i < numQuantity; i++) {
      icons.push(<FaCube key={i} className="quantity-icon" />);
    }

    return <div>{icons}</div>;
  };

  return (
    <li className="item-card">
      <img
        src={categoryImages[item.category] || Custom}
        alt={item.category}
        className="item-image"
      />
      <div className="item-details">
        <span className={`item-text ${item.checked ? 'checked' : ''}`}>
          {item.name}
        </span>
        <div className="item-quantity">
          Quantity: {renderQuantityIcons(item.quantity)}
        </div>
        <span className="item-notes">Notes: {item.notes}</span>
        <span className="item-remaining">
          Remaining: {item.quantity - (item.checked ? 1 : 0)}
        </span>
      </div>
      <div className="item-actions">
        <button
          className="toggle-check-button"
          onClick={() => onToggleChecked(item.id)}
        >
          {item.checked ? <FaUndo /> : <FaCheck />} Check
        </button>
        <button
          className="edit-button"
          onClick={() =>
            onEdit(item.id, item.name, item.quantity, item.category, item.notes)
          }
        >
          <FaEdit /> Edit
        </button>
        <button
          className="delete-button"
          onClick={() => onRemove(item.id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </li>
  );
};

export default ItemCard;