import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const PriveteRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin()
    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }
    //
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={location} replace />
};

export default PriveteRoute;