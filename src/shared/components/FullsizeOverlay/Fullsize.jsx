// Fullsize.jsx

import React from 'react';
import './Fullsize.scss';
import { IoClose } from 'react-icons/io5'; // Kapatma ikonu

const Fullsize = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fullsize-overlay" onClick={(e) => e.stopPropagation()}>
        {children}
    </div>
  );
};

export default Fullsize;
