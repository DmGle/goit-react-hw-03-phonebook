import React from 'react';
import './contactForm.css'

const Filter = ({ value, onChange }) => (
  <label>
    Filter contacts by name:
    <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;