import React from 'react';
// Components
import Logo from '../../../features/Header/Logo';
import SearchBar from '../../../features/Header/SearchBar';
import UserActions from '../../../features/Header/UserActions';

// Styles
import "./header.scss";

const Header = React.memo(() => {
   
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
