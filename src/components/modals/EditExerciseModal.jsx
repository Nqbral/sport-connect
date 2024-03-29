import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import REGEX_RULES from '../../constants';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

const API_URL = process.env.API_URL;

export default function EditExerciseModal({
    open,
    close,
    index,
    exerciseEdited,
    handleEditExercise,
}) {
    const [listDefaultExercises, setListDefaultExercises] = useState([]);
    const [optionDefault, setOptionDefault] = useState();
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
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/exercises`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setListDefaultExercises(response.data);
            })
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

        handleEditExercise(index, {
            exercise: exercice,
            nbSeries: nbSeries,
            nbReps: nbReps,
            timeRest: timeRest,
        });

        close();
    };

    const handleClose = (event) => {
        event.preventDefault();
        close();
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
        setOptionDefault(options[0]);
    }, [listDefaultExercises]);

    useEffect(() => {
        if (open) {
            setOptionDefault(
                optionsExercises.find((option) => {
                    return option.value._id == exerciseEdited.exercise._id;
                }),
            );
            setExercice(exerciseEdited.exercise);
            setNbSeries(exerciseEdited.nbSeries);
            setNbReps(exerciseEdited.nbReps);
            setTimeRest(exerciseEdited.timeRest);
        }
        resetErrMessages();
    }, [open, exerciseEdited]);

    const resetErrMessages = () => {
        setErrMsgExercise('');
        setErrMsgNbSeries('');
        setErrMsgNbReps('');
        setErrMsgTimeRest('');
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form
                onSubmit={handleSubmit}
                className="flex min-w-80 max-w-80 flex-col gap-3 p-4"
            >
                <h2 className="text-center text-lg font-bold">
                    Éditer un exercice
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
                    value={optionDefault}
                    placeholder="Selectionner un exercice"
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
                    value={nbSeries}
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
                    value={nbReps}
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
                    value={timeRest}
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
