import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';

import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

export default function CreateFeedPostModal({ open, close, addPost }) {
    const [message, setMessage] = useState('');
    const [validMessage, setValidMessage] = useState(false);
    const [errMsgMessage, setErrMsgMessage] = useState('');

    const handleClose = (event) => {
        event.preventDefault();

        close();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        resetErrMessages();

        if (!validMessage) {
            setErrMsgMessage('Veuillez saisir un message');
            return;
        }

        addPost(message);

        close();
    };

    const resetErrMessages = () => {
        setErrMsgMessage('');
    };

    useEffect(() => {
        setValidMessage(message.trim() != '');
    }, [message]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <form
                onSubmit={handleSubmit}
                className="flex min-w-80 max-w-80 flex-col gap-3 p-4"
            >
                <h2 className="text-center text-lg font-bold">Créer un post</h2>
                <p
                    className={errMsgMessage ? 'text-red-600' : 'hidden'}
                    aria-live="assertive"
                >
                    {errMsgMessage}
                </p>
                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={200}
                    placeholder="Saisissez un message..."
                    className="h-32 rounded-md border-2 border-neutral-300 p-4"
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
