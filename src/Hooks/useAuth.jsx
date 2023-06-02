import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuth = () => {
    const auth = useContext(AuthContext)
    //here auth a simple variable , its value authInfo's value of context api.
    return auth;
};

export default useAuth;