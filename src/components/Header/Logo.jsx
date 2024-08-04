import React from 'react'
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png"
import { Link } from 'react-router-dom'
function Logo() {
    return (
        <Link to='/' className='logo-link'>
        <img className='logo' src={ShopenyLogo} />
    </Link>
     
    )
}

export default Logo