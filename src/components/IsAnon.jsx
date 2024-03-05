import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';

export default function IsAnon({ children }) {
    const { isLoading, isLoggedIn } = useContext(AuthContext);

    if (isLoading) {
        return <></>;
    }

    if (isLoggedIn) {
        return <Navigate to="/feed" />;
    }
    return children;
}
