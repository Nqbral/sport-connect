import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';

import REGEX_RULES from '../../constants';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

export default function EditRestModal({
    open,
    close,
    index,
    restEdited,
    handleEditRest,
}) {
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

        handleEditRest(index, {
            timeRest: timeRest,
        });

        close();
    };

    const resetErrMessages = () => {
        setErrMsgTimeRest('');
    };

    useEffect(() => {
        if (open) {
            setTimeRest(restEdited.timeRest);
        }
    }, [open, restEdited]);

    useEffect(() => {
        setValidTimeRest(REGEX_RULES.DIGIT_REGEX.test(timeRest));
    }, [timeRest]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <form
                onSubmit={handleSubmit}
                className="flex min-w-80 max-w-80 flex-col gap-3 p-4"
            >
                <h2 className="text-center text-lg font-bold">
                    Éditer le temps de repos
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
                    value={timeRest}
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
