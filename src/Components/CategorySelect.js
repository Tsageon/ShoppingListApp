import React from 'react';
import './CategorySelect.css';

const CategorySelect = ({
  predefinedCategories,
  category,
  isCustomCategory,
  onCategoryChange,
  onCustomCategoryChange,
  error
}) => {
  
  return (
    <div className="category-select-container">
      {isCustomCategory ? (
        <input
          type="text"
          value={category}
          onChange={onCustomCategoryChange}
          placeholder="Enter category"
          className="category-input"
        />
      ) : (
        <select
          value={category}
          onChange={onCategoryChange}
          className="category-select"
        >
          <option value="">Select category</option>
          {predefinedCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="custom">Custom</option>
        </select>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CategorySelect;