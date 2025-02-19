import React from 'react';

export const Button = ({ children, onClick, variant }) => (
  <button className={`button ${variant}`} onClick={onClick}>
    {children}
  </button>
);