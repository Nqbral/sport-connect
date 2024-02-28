import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import SignUpModal from '../components/SignUpModal';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { AuthContext } from '../context/auth.context';

export default function HomePage() {
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

    useEffect(() => {
        setLoginButtonDisabled(user === '' || pwd === '');
    }, [user, pwd]);

    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    };

    // function to handle modal close
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const API_URL = process.env.API_URL;

        axios
            .post(`${API_URL}/api/auth/signin`, { name: user, password: pwd })
            .then((response) => {
                storeToken(response.data.token);
                authenticateUser();
                navigate('/feed');
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrMsg(errorDescription);
            });
    };

    return (
        <div id="homepage">
            <div className="flex flex-col md:flex-row">
                <div className="flex h-72 w-auto flex-col items-center justify-center gap-4 bg-primary-700 text-white md:h-screen md:w-1/2">
                    <h1 className="text-5xl font-bold">Sport Connect</h1>
                    <h2 className="text-xl">
                        Construis ton corps, construis des liens
                    </h2>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center gap-8 md:mt-0 md:w-1/2">
                    <div className="flex min-w-80 flex-col items-center gap-2 p-8 shadow-md shadow-neutral-500">
                        <h3 className="text-2xl font-bold">Inscrivez-vous</h3>
                        <PrimaryButton
                            buttonText={'Créer un compte'}
                            onClick={handleOpen}
                        />
                    </div>
                    <form
                        className="mb-8 flex min-w-80 flex-col items-center gap-3 rounded-md p-8 shadow-md shadow-neutral-500"
                        onSubmit={handleSubmit}
                    >
                        <h3 className="text-lg font-bold">
                            Vous avez déjà un compte ?
                        </h3>
                        <p
                            ref={errRef}
                            className={
                                errMsg
                                    ? 'text-red-600 max-w-60 text-center'
                                    : 'hidden'
                            }
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                        <label htmlFor="username">Nom d&apos;utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            required
                            onChange={(event) => setUser(event.target.value)}
                        />
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            onChange={(event) => setPwd(event.target.value)}
                            required
                        />
                        <PrimaryButton
                            buttonText={'Se connecter'}
                            disabled={loginButtonDisabled}
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
            </div>
            <SignUpModal open={open} handleClose={handleClose} />
        </div>
    );
}
