import React from 'react';
import './FormField.css';

const FormField = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  textarea = false
}) => {
  return (
    <div className="form-field">
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-textarea"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input"
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormField;