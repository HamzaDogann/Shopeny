import React from 'react';
import { Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthProtectedRoute = ({ element }) => {
    
    const user = useSelector(state => state.auth.user);

    if (user=="nologinuser") {
        return element;
    }
    if (user) {
        return <Navigate to="/" />;
    }

    return element;
};

export default AuthProtectedRoute;
