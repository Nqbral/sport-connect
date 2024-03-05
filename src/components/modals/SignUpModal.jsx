import {
    faCheck,
    faInfoCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth.context';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignUpModal({ open, handleClose }) {
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(matchPwd && pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
            setErrMsg('Erreur de saisie');
            return;
        }
        const API_URL = process.env.API_URL;

        axios
            .post(`${API_URL}/api/auth/signup`, { name: user, password: pwd })
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
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="min-w-80 max-w-80 p-4">
                <div className="flex flex-col gap-2">
                    <p
                        ref={errRef}
                        className={errMsg ? 'text-red-600' : 'hidden'}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h2 className="text-center text-2xl font-bold">
                        Création de compte
                    </h2>
                    <label htmlFor="username">
                        Nom d&apos;utilisateur{' '}
                        <span
                            className={
                                validName ? 'text-primary-700' : 'hidden'
                            }
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName ? 'hidden' : 'text-red-600'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        ref={userRef}
                        autoComplete="off"
                        className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                        onChange={(event) => setUser(event.target.value)}
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        required
                    />
                    <p
                        id="uidnote"
                        className={
                            userFocus && user && !validName
                                ? 'text-red-600 text-sm'
                                : 'hidden'
                        }
                    >
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="pr-1 text-stone-900"
                        />
                        4 à 24 caractères
                        <br />
                        Doit commencer avec une lettre
                        <br />
                        Lettres, nombres, underscores et apostrophes sont
                        autorisés
                    </p>
                    <label htmlFor="password">
                        Mot de passe{' '}
                        <span
                            className={validPwd ? 'text-primary-700' : 'hidden'}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd ? 'hidden' : 'text-red-600'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                        onChange={(event) => setPwd(event.target.value)}
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        required
                    />
                    <p
                        id="pwdnote"
                        className={
                            pwdFocus && pwd && !validPwd
                                ? 'text-red-600 text-sm'
                                : 'hidden'
                        }
                    >
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="pr-1 text-stone-900"
                        />
                        8 à 24 caractères
                        <br />
                        Doit avoir une lettre majuscule, minuscule, un chiffre
                        et un caractère spécial
                        <br />
                        Caractères spéciaux autorisés : !@#$%
                    </p>
                    <label htmlFor="confirm_password">
                        Confirmer le mot de passe{' '}
                        <span
                            className={
                                validMatch ? 'text-primary-700' : 'hidden'
                            }
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                            className={validMatch ? 'hidden' : 'text-red-600'}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="password"
                        name="confirm_password"
                        autoComplete="off"
                        className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                        onChange={(event) => setMatchPwd(event.target.value)}
                        aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby="matchpwdnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        required
                    />
                    <p
                        id="matchpwdnote"
                        className={
                            matchFocus && matchPwd && !validMatch
                                ? 'text-red-600 text-sm'
                                : 'hidden'
                        }
                    >
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="pr-1 text-stone-900"
                        />
                        Doit correspondre au premier mot de passe saisi
                    </p>
                </div>
                <div className="mt-6 flex flex-row justify-between gap-2">
                    <SecondaryButton
                        buttonText={'Annuler'}
                        onClick={handleClose}
                    />
                    <PrimaryButton
                        buttonText={'Valider'}
                        disabled={!(validName && validPwd && validMatch)}
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </Dialog>
    );
}
