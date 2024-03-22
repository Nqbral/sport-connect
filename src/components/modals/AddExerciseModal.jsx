import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import REGEX_RULES from '../../constants';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

const API_URL = process.env.API_URL;
const storedToken = localStorage.getItem('authToken');

export default function AddExerciseModal({ open, close, addExercise }) {
    const [listDefaultExercises, setListDefaultExercises] = useState([]);
    const [optionsExercises, setOptionsExercises] = useState([]);

    const [exercice, setExercice] = useState(null);
    const [validExercice, setValidExercise] = useState(false);
    const [errMsgExercise, setErrMsgExercise] = useState('');

    const [nbSeries, setNbSeries] = useState(null);
    const [validNbSeries, setValidNbSeries] = useState(false);
    const [errMsgNbSeries, setErrMsgNbSeries] = useState('');

    const [nbReps, setNbReps] = useState(null);
    const [validNbReps, setValidNbReps] = useState(false);
    const [errMsgNbReps, setErrMsgNbReps] = useState('');

    const [timeRest, setTimeRest] = useState(null);
    const [validTimeRest, setValidTimeRest] = useState(false);
    const [errMsgTimeRest, setErrMsgTimeRest] = useState('');

    const getAllDefautExercises = () => {
        axios
            .get(`${API_URL}/api/exercises`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => setListDefaultExercises(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllDefautExercises();
    }, []);

    useEffect(() => {
        setValidExercise(exercice != null);
    }, [exercice]);

    useEffect(() => {
        setValidNbSeries(REGEX_RULES.DIGIT_REGEX.test(nbSeries));
    }, [nbSeries]);

    useEffect(() => {
        setValidNbReps(REGEX_RULES.DIGIT_REGEX.test(nbReps));
    }, [nbReps]);

    useEffect(() => {
        setValidTimeRest(REGEX_RULES.DIGIT_REGEX.test(timeRest));
    }, [timeRest]);

    const handleSubmit = (event) => {
        event.preventDefault();

        resetErrMessages();

        if (
            !validExercice ||
            !validNbReps ||
            !validNbSeries ||
            !validTimeRest
        ) {
            if (!validExercice) {
                setErrMsgExercise('Veuillez sélectionner un exercice.');
            }

            if (!validNbReps) {
                setErrMsgNbReps('Veuillez saisir un entier supérieur à 0.');
            }

            if (!validNbSeries) {
                setErrMsgNbSeries('Veuillez saisir un entier supérieur à 0.');
            }

            if (!validTimeRest) {
                setErrMsgTimeRest('Veuillez saisir un entier supérieur à 0.');
            }

            return;
        }

        addExercise({
            exercise: exercice,
            nbSeries: nbSeries,
            nbReps: nbReps,
            timeRest: timeRest,
        });
        resetForm();
        resetErrMessages();
        close();
    };

    const handleClose = (event) => {
        event.preventDefault();

        resetForm();
        resetErrMessages();
        close();
    };

    const resetForm = () => {
        setExercice(null);
        setNbSeries(null);
        setNbReps(null);
        setTimeRest(null);
    };

    const resetErrMessages = () => {
        setErrMsgExercise('');
        setErrMsgNbSeries('');
        setErrMsgNbReps('');
        setErrMsgTimeRest('');
    };

    useEffect(() => {
        let options = [];

        listDefaultExercises.forEach((exercise) => {
            options.push({
                value: exercise,
                label: exercise.name,
            });
        });
        setOptionsExercises(options);
    }, [listDefaultExercises]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <form
                onSubmit={handleSubmit}
                className="flex min-w-80 max-w-80 flex-col gap-3 p-4"
            >
                <h2 className="text-center text-lg font-bold">
                    Ajouter un exercice
                </h2>
                <p
                    className={errMsgExercise ? 'text-red-600' : 'hidden'}
                    aria-live="assertive"
                >
                    {errMsgExercise}
                </p>
                <Dropdown
                    options={optionsExercises}
                    onChange={(option) => setExercice(option.value)}
                    placeholder="Sélectionner un exercice"
                ></Dropdown>
                <p
                    className={errMsgNbSeries ? 'text-red-600' : 'hidden'}
                    aria-live="assertive"
                >
                    {errMsgNbSeries}
                </p>
                <label htmlFor="nbseries">Nombre de séries</label>
                <input
                    type="number"
                    name="nbseries"
                    className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                    required
                    onChange={(event) => setNbSeries(event.target.value)}
                    min={1}
                    step={1}
                />
                <p
                    className={errMsgNbReps ? 'text-red-600' : 'hidden'}
                    aria-live="assertive"
                >
                    {errMsgNbReps}
                </p>
                <label htmlFor="nbreps">Nombre de répétitions par série</label>
                <input
                    type="number"
                    name="nbreps"
                    className="rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                    required
                    onChange={(event) => setNbReps(event.target.value)}
                    min={1}
                    step={1}
                />
                <p
                    className={errMsgTimeRest ? 'text-red-600' : 'hidden'}
                    aria-live="assertive"
                >
                    {errMsgTimeRest}
                </p>
                <label htmlFor="timerest">
                    Temps de repos entre chaque série (en <b>secondes</b>)
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
