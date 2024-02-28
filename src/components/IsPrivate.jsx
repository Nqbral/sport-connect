import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';

export default function IsPrivate({ children }) {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
}
