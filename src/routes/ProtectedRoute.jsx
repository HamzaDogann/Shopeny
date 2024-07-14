import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
    const isLoading = useSelector((state) => state.preLoader.isLoading);
    const user = useSelector((state) => state.auth.user);

    if (isLoading) {
        return <div className='projected-route'></div>;
    }

    return   user == "usernologin" ? <Navigate to="/giris-yap" /> : element;
};

export default ProtectedRoute;