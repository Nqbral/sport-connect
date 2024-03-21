import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';

export default function IsPrivate({ children }) {
    const { isLoading, isLoggedIn } = useContext(AuthContext);

    if (isLoading) {
        return <></>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
}
