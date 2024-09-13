import React from 'react'
import { Link } from 'react-router-dom'
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png"

function Logo() {
    return (
        <Link to='/' className='logo-link'>
            <img className='logo' src={ShopenyLogo} />
        </Link>
    )
}

export default Logo