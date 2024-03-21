import { useContext, useEffect, useState } from 'react';

import userLogo from '../../assets/user.png';
import { AuthContext } from '../../context/auth.context';
import LinkButton from '../buttons/LinkButton';

export default function ProfileInformations({ userPage }) {
    const { user } = useContext(AuthContext);
    const [userConnectedIsUserPage, setUserConnectedIsUserPage] =
        useState(false);

    useEffect(() => {
        if (userPage != null) {
            setUserConnectedIsUserPage(userPage._id == user.userId);
        }
    }, [userPage]);

    return (
        <>
            <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                <div className="font-bold">
                    Informations de l&apos;utilisateur
                </div>
                <div>
                    <img src={userLogo} className="h-16" alt="user_logo" />
                </div>
                <div>
                    <span className="italic text-neutral-400">Nom : </span>
                    {userPage.lastname}
                </div>
                <div>
                    <span className="italic text-neutral-400">Prénom : </span>
                    {userPage.lastname}
                </div>
                <div>
                    <span className="italic text-neutral-400">
                        Date de naissance :{' '}
                    </span>
                    {userPage.lastname}
                </div>
                {userConnectedIsUserPage ? (
                    <LinkButton buttonText={'Éditer le profil'} />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
