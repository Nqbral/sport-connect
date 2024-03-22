import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router-dom';

import ProfileInformations from '../../components/profile/ProfileInformations';
import ProfilePosts from '../../components/profile/ProfilePosts';
import ProfileWorkouts from '../../components/profile/ProfileWorkouts';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

const API_URL = process.env.API_URL;

export default function ProfilePage() {
    const { username } = useParams();
    const [userPage, setUserPage] = useState(null);

    useEffect(() => {
        getUser();
    }, [username]);

    const getUser = async () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/users/${username}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setUserPage(response.data);
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <ClassicPage pageSelectedNavbar={PAGE_SELECTED.PROFILE}>
                <section
                    id="profile-page"
                    className="flex w-full flex-col items-center gap-3 pb-4"
                >
                    {userPage == null ? (
                        <ReactLoading type="spin" color="#1D4ED8" />
                    ) : (
                        <>
                            <h2 className="text-xl font-bold">
                                Profil de {userPage.name}
                            </h2>
                            <ProfileInformations userPage={userPage} />
                            <ProfileWorkouts userPage={userPage} />
                            <ProfilePosts userPage={userPage} />
                        </>
                    )}
                </section>
            </ClassicPage>
        </>
    );
}
