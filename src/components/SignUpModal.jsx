import Dialog from '@mui/material/Dialog';
import { useState } from 'react';

import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';

export default function SignUpModal({ open, handleClose }) {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        handleClose();
    };

    return (
        // props received from App.js
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="min-w-80 p-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-center text-2xl font-bold">
                        Création de compte
                    </h2>
                    <label htmlFor="username">Nom d&apos;utilisateur</label>
                    <input
                        type="text"
                        name="username"
                        className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                    />
                    <label htmlFor="lastname">Nom</label>
                    <input
                        type="text"
                        name="lastname"
                        className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                    />
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        name="firstname"
                        className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                    />
                </div>
                <div className="mt-6 flex flex-row justify-between gap-2">
                    <SecondaryButton
                        buttonText={'Annuler'}
                        onClick={handleClose}
                    />
                    <PrimaryButton
                        buttonText={'Valider'}
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </Dialog>
    );
}
