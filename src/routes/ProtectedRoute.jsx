import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {

    const isLoading = useSelector((state) => state.preLoader.isLoading);
    const user = useSelector((state) => state.auth.user);

    if (isLoading || user == "nologinuser") {
        return <div className='projected-route'></div>;
    }

    if (user == null) {
        return <Navigate to="/giris-yap" />;
    }

    return element;
};

export default ProtectedRoute;