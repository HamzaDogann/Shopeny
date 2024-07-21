import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
    const location = useLocation();
    const { pathname } = location;

    // Patikayı parçalayarak her bir segmenti alıyoruz
    const pathnames = pathname.split('/').filter(x => x);

    // Eğer sadece anasayfa ise Breadcrumbs render etme
    if (pathname === '/') {
        return null;
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ');
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
                            <li key={index} className="breadcrumb-item">{capitalizeFirstLetter(name)}</li>
                        ) : (
                            <li key={index}>
                                <Link to={routeTo}>{capitalizeFirstLetter(name)}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Breadcrumbs;