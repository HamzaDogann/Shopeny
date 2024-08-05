// Fullsize.jsx

import React from 'react';
import './Fullsize.scss';

const Fullsize = ({ isVisible, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fullsize-overlay" onClick={(e) => e.stopPropagation()}>
        {children}
    </div>
  );
};

export default Fullsize;
