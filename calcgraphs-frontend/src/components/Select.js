"use client"
import React, { useState } from 'react';

function SimpleSelect({ items, onSelectChange, placeholder = "Selecione uma opção" }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onSelectChange) {
      onSelectChange(newValue);
    }
  };

  const selectStyle = {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    minWidth: '200px',
    backgroundColor: 'white',
    cursor: 'pointer'
  };

  return (
    <select
      style={selectStyle}
      value={selectedValue}
      onChange={handleChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default SimpleSelect;