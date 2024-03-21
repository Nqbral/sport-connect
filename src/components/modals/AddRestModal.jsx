import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';

import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

const DIGIT_REGEX = /^\d+$/;

export default function AddRestModal({ open, close, addRest }) {
    const [timeRest, setTimeRest] = useState(null);
    const [validTimeRest, setValidTimeRest] = useState(false);
    const [errMsgTimeRest, setErrMsgTimeRest] = useState('');

    const handleClose = (event) => {
        event.preventDefault();

        close();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        resetErrMessages();

        if (!validTimeRest) {
            setErrMsgTimeRest('Veuillez saisir un entier supérieur à 0.');
            return;
        }

        addRest({
            timeRest: timeRest,
        });

        close();
    };

    const resetErrMessages = () => {
        setErrMsgTimeRest('');
    };

    useEffect(() => {
        setValidTimeRest(DIGIT_REGEX.test(timeRest));
    }, [timeRest]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <form
                onSubmit={handleSubmit}
                className="flex min-w-80 max-w-80 flex-col gap-3 p-4"
            >
                <h2 className="text-center text-lg font-bold">
                    Ajouter du repos
                </h2>
                <p
                    className={errMsgTimeRest ? 'text-red-600' : 'hidden'}
                    aria-live="assertive"
                >
                    {errMsgTimeRest}
                </p>
                <label htmlFor="timerest">
                    Temps de repos (en <b>secondes</b>)
                </label>
                <input
                    type="number"
                    name="timerest"
                    className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                    required
                    onChange={(event) => setTimeRest(event.target.value)}
                    min={0}
                    step={1}
                />
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
