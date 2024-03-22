import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import LinkButton from '../../components/buttons/LinkButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { AuthContext } from '../../context/auth.context';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

const API_URL = process.env.API_URL;

export default function EditProfilePage() {
    const { user } = useContext(AuthContext);

    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [birthdate, setBirthdate] = useState(user.birthdate);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errMsgPwd, setErrMsgPwd] = useState('');
    const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(true);

    const editInformations = (event) => {
        event.preventDefault();

        const storedToken = localStorage.getItem('authToken');

        axios
            .put(
                `${API_URL}/api/users/edit_informations`,
                {
                    firstname: firstname,
                    lastname: lastname,
                    birthdate: new Date(birthdate).valueOf(),
                },
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                },
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changePassword = (event) => {
        event.preventDefault();
        setErrMsgPwd('');

        const storedToken = localStorage.getItem('authToken');

        axios
            .put(
                `${API_URL}/api/users/change_password`,
                {
                    password: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                },
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                setErrMsgPwd(error.response.data.message);
            });
    };

    useEffect(() => {
        setPasswordButtonDisabled(oldPassword === '' || newPassword === '');
    }, [oldPassword, newPassword]);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/users/${user.name}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                let userPage = response.data;

                setFirstname(userPage.firstname);
                setLastname(userPage.lastname);

                if (userPage.birthdate != null) {
                    setBirthdate(
                        new Date(userPage.birthdate)
                            .toISOString()
                            .substring(0, 10),
                    );
                }
            })
            .catch((error) => console.log(error));
    }, [user]);

    return (
        <>
            <ClassicPage pageSelectedNavbar={PAGE_SELECTED.PROFILE}>
                <section
                    id="edit-profile-page"
                    className="flex w-full flex-col items-center gap-3"
                >
                    <h2 className="text-xl font-bold">Éditer le profil</h2>

                    {/* Edit user informations section */}
                    <form className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                        <div className="font-bold">
                            Éditer les informations utilisateur
                        </div>

                        <label htmlFor="firstname">Prénom</label>
                        <input
                            type="text"
                            name="firstname"
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            value={firstname}
                            onChange={(event) =>
                                setFirstname(event.target.value)
                            }
                        />

                        <label htmlFor="lastname">Nom</label>
                        <input
                            type="text"
                            name="lastname"
                            value={lastname}
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            onChange={(event) =>
                                setLastname(event.target.value)
                            }
                        />

                        <label htmlFor="birthdate">Date de naissance</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={birthdate}
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            onChange={(event) =>
                                setBirthdate(event.target.value)
                            }
                        />

                        <PrimaryButton
                            buttonText={'Sauvegarder'}
                            onClick={editInformations}
                        />
                    </form>

                    {/* Change password section */}
                    <form className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                        <div className="font-bold">Changer le mot de passe</div>

                        <p
                            className={
                                errMsgPwd
                                    ? 'text-red-600 max-w-60 text-center'
                                    : 'hidden'
                            }
                            aria-live="assertive"
                        >
                            {errMsgPwd}
                        </p>

                        <label htmlFor="oldpassword">Ancien mot de passe</label>
                        <input
                            type="password"
                            name="oldpassword"
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            onChange={(event) =>
                                setOldPassword(event.target.value)
                            }
                        />

                        <label htmlFor="newpassword">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            name="newpassword"
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            onChange={(event) =>
                                setNewPassword(event.target.value)
                            }
                        />

                        <PrimaryButton
                            buttonText={'Sauvegarder'}
                            disabled={passwordButtonDisabled}
                            onClick={changePassword}
                        />
                    </form>

                    <LinkButton
                        buttonText={'Retour sur le profil'}
                        primary={false}
                        linkTo={`/profile/${user.name}`}
                    />
                </section>
            </ClassicPage>
        </>
    );
}
