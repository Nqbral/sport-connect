import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import userLogo from '../../assets/user.png';
import { AuthContext } from '../../context/auth.context';
import DateHelper from '../../helpers/Date';
import LinkButton from '../buttons/LinkButton';
import PrimaryButton from '../buttons/PrimaryButton';
import RedButton from '../buttons/RedButton';

const API_URL = process.env.API_URL;

export default function ProfileInformations({ userPage }) {
    const { user } = useContext(AuthContext);
    const [userConnectedIsUserPage, setUserConnectedIsUserPage] =
        useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [linkFollowId, setLinkFollowId] = useState(null);

    useEffect(() => {
        if (userPage != null) {
            setUserConnectedIsUserPage(userPage._id == user.userId);
            getLinkSubscribe();
        }
    }, [userPage]);

    const getLinkSubscribe = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/linkfollows/${userPage._id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                if (response.data != null) {
                    setIsFollowed(true);
                    setLinkFollowId(response.data._id);
                }
            })
            .catch((error) => console.log(error));
    };

    const createFollow = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .post(
                `${API_URL}/api/linkfollows`,
                { followid: userPage._id },
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                },
            )
            .then((response) => {
                setIsFollowed(true);
                setLinkFollowId(response.data._id);
            })
            .catch((error) => console.log(error));
    };

    const deleteFollow = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .delete(`${API_URL}/api/linkfollows/${linkFollowId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setIsFollowed(false);
            })
            .catch((error) => console.log(error));
    };

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
                    {userPage.firstname}
                </div>
                <div>
                    <span className="italic text-neutral-400">
                        Date de naissance :{' '}
                    </span>
                    {userPage.birthdate != null
                        ? DateHelper.formatClientDate(userPage.birthdate)
                        : ''}
                </div>
                {userConnectedIsUserPage ? (
                    <LinkButton
                        buttonText={'Éditer le profil'}
                        linkTo={'/profile/edit'}
                    />
                ) : isFollowed ? (
                    <RedButton
                        buttonText={'Ne plus suivre'}
                        onClick={deleteFollow}
                    />
                ) : (
                    <PrimaryButton
                        buttonText={"S'abonner"}
                        onClick={createFollow}
                    />
                )}
            </div>
        </>
    );
}
