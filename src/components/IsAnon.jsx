import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';

export default function IsAnon({ children }) {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to="/feed" />;
    }
    return children;
}
