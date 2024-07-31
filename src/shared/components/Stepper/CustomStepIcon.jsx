import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCreditCard } from 'react-icons/fa';
import { TbShoppingBagCheck } from 'react-icons/tb';

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    background: ownerState.completed
        ? 'linear-gradient(40deg, #f27d59 20%, #496aee 100%)'
        : 'linear-gradient(45deg, #eaeaf0 0%, #eaeaf0 100%)',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage: 'linear-gradient(40deg, #f27d59 20%, #496aee 100%)',
        boxShadow: '0 4px 12px 0px rgba(0,0,0,.25)',
    }),
}));

function CustomStepIcon(props) {
    const { active, completed, className, icon } = props;

    const icons = {
        1: <FaLocationDot size={24} />,
        2: <FaCreditCard size={24} />,
        3: <TbShoppingBagCheck size={24} />
    };

    return (
        <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
            {completed ? <Check /> : icons[String(icon)]}
        </CustomStepIconRoot>
    );
}

CustomStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

export default CustomStepIcon;
