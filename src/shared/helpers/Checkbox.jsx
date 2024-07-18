import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ id, label }) {
    return (
        <div className="checkbox-wrapper-4">
            <input className="inp-cbx" id={id} type="checkbox" />
            <label className="cbx" htmlFor={id}>
                <span>
                    <svg width="12px" height="10px">
                        <use xlinkHref={`#${id}-check`} />
                    </svg>
                </span>
                <span>{label}</span>
            </label>
            <svg className="inline-svg">
                <symbol id={`${id}-check`} viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
            </svg>
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default Checkbox;
