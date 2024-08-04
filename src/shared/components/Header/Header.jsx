import React from 'react';
import { useLocation } from 'react-router-dom';
// Components
import Logo from '../../../components/Header/Logo';
import SearchBar from '../../../components/Header/SearchBar';
import UserActions from '../../../components/Header/UserActions';

// Styles
import "./header.scss";

const Header = React.memo(() => {
    const location = useLocation();

    if (location.pathname.startsWith("/sepetim/odeme-islemleri")) {
        return null;
    }

    return (
        <div className='header-box'>
            <div className='header-item'>
                <Logo />
            </div>
            <div className='header-item'>
                <SearchBar />
            </div>
            <div className='header-item'>
                <UserActions />
            </div>
        </div>
    );
});

export default Header;
