import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import userLogo from '../assets/user.png';
import { AuthContext } from '../context/auth.context';

export default function ProfileBar({ linkToBackButton = null }) {
    const { user } = useContext(AuthContext);

    return (
        <div className="fixed top-0 z-10 w-screen bg-primary-700 p-5 py-2 shadow-md shadow-neutral-500">
            <div className="flex flex-row items-center gap-3">
                {linkToBackButton !== null ? (
                    <Link to={linkToBackButton}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="text-white"
                        />
                    </Link>
                ) : (
                    <></>
                )}
                <Link
                    to="/profile"
                    className="flex flex-row items-center gap-3"
                >
                    <img src={userLogo} className="h-8" alt="user_logo" />
                    <div className="text-white">@{user.name}</div>
                </Link>
            </div>
        </div>
    );
}
