import { useState } from 'react';

import SignUpModal from '../components/SignUpModal';
import LinkButton from '../components/buttons/LinkButton';
import PrimaryButton from '../components/buttons/PrimaryButton';

export default function HomePage() {
    const [open, setOpen] = useState(false);

    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    };

    // function to handle modal close
    const handleClose = () => {
        setOpen(false);
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
                <div className="mt-10 flex flex-col items-center justify-center gap-8 md:mt-0 md:h-screen md:w-1/2">
                    <div className="flex min-w-80 flex-col items-center gap-2 p-8 shadow-md shadow-neutral-500">
                        <h3 className="text-2xl font-bold">Inscrivez-vous</h3>
                        <PrimaryButton
                            buttonText={'Créer un compte'}
                            onClick={handleOpen}
                        />
                    </div>
                    <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-8 shadow-md shadow-neutral-500">
                        <h3 className="text-lg font-bold">
                            Vous avez déjà un compte ?
                        </h3>
                        <label htmlFor="username">Nom d&apos;utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                        />
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                        />
                        <LinkButton
                            linkTo={'/login'}
                            buttonText={'Se connecter'}
                            primary={false}
                        />
                    </div>
                </div>
            </div>
            <SignUpModal open={open} handleClose={handleClose} />
        </div>
    );
}
