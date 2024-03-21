import axios from 'axios';
import { useEffect, useState } from 'react';
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
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/users/${username}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setUserPage(response.data);
            })
            .catch((error) => console.log(error));
    }, [username]);

    return (
        <>
            <ClassicPage pageSelectedNavbar={PAGE_SELECTED.PROFILE}>
                <section
                    id="profile-page"
                    className="flex w-full flex-col items-center gap-3 pb-4"
                >
                    {userPage == null ? (
                        <>loading</>
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
