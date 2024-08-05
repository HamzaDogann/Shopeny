import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
    const location = useLocation();
    const { pathname } = location;

    const pathnames = pathname.split('/').filter(x => x);

    if (pathname === '/') {
        return null;
    }

    const capitalizeFirstLetters = (string) => {
        return string
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <nav className="breadcrumbs">
            <div className='breadcrumbs-box'>
                <ul>
                    <li><Link to="/">Anasayfa</Link></li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        return isLast ? (
                            <li key={index} className="breadcrumb-item">{capitalizeFirstLetters(name)}</li>
                        ) : (
                            <li key={index}>
                                <Link to={routeTo}>{capitalizeFirstLetters(name)}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Breadcrumbs;