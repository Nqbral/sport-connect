import { Link } from 'react-router-dom';

import userLogo from '../../assets/user.png';

export default function SearchUser({ user }) {
    return (
        <>
            <Link to={`/profile/${user.name}`}>
                <div className="shadow-neutral flex min-w-64 flex-col justify-center gap-2 rounded-md p-4 shadow-md md:w-1/2">
                    <div className="flex flex-row items-center gap-2">
                        <img src={userLogo} className="h-8" alt="user_logo" />
                        <div>@{user.name}</div>
                    </div>
                    <div className="flex flex-row gap-1 text-sm text-neutral-400">
                        {user.firstname != '' ? (
                            <div>{user.firstname}</div>
                        ) : (
                            <></>
                        )}
                        {user.lastname != '' ? (
                            <div>{user.lastname}</div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </Link>
        </>
    );
}
