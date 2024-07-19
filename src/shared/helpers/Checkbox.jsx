import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ id, label, checked, onChange }) {
  return (
    <div className="checkbox-wrapper-13">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;