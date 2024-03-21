import axios from 'axios';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ExerciseDraggable from '../../components/draggable/Exercise';
import ExercisesDraggable from '../../components/draggable/Exercises';
import AddExerciseModal from '../../components/modals/AddExerciseModal';
import AddRestModal from '../../components/modals/AddRestModal';
import EditExerciseModal from '../../components/modals/EditExerciseModal';
import EditRestModal from '../../components/modals/EditRestModal';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

const ALPHANUM_REGEX = /^[a-z\d\-_\s]+$/i;
const API_URL = process.env.API_URL;

export default function CreateWorkoutPage() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [exercises, setExercises] = useState([]);

    const [validName, setValidName] = useState(false);
    const [errMsgName, setErrMsgName] = useState('');

    const [validExercises, setValidExercises] = useState(false);
    const [errMsgExercises, setErrMsgExercises] = useState('');

    const [indexEditExercise, setIndexEditExercise] = useState(null);
    const [indexEditRest, setIndexEditRest] = useState(null);
    const [exerciseEdited, setExerciseEdited] = useState(null);
    const [restEdited, setRestEdited] = useState(null);

    const [openAddingExercice, setOpenAddingExercice] = useState(false);
    const [openAddingRest, setOpenAddingRest] = useState(false);
    const [openEditingExercise, setOpenEditingExercise] = useState(false);
    const [openEditingRest, setOpenEditingRest] = useState(false);

    const [addedExercises, setAddedExercises] = useState(0);

    // function to handle modal open adding exercice
    const handleOpenAddingExercice = () => {
        setOpenAddingExercice(true);
    };

    // function to handle modal close adding exercice
    const handleCloseAddingExercice = () => {
        setOpenAddingExercice(false);
    };

    // function to handle modal open adding rest
    const handleOpenAddingRest = () => {
        setOpenAddingRest(true);
    };

    // function to handle modal close adding rest
    const handleCloseAddingRest = () => {
        setOpenAddingRest(false);
    };

    // function to handle modal open editing exercise
    const handleOpenEditingExercise = () => {
        setOpenEditingExercise(true);
    };

    // function to handle modal close editing exercise
    const handleCloseEditingExercise = () => {
        setOpenEditingExercise(false);
    };

    // function to handle modal open editing rest
    const handleOpenEditingRest = () => {
        setOpenEditingRest(true);
    };

    // function to handle modal close editing rest
    const handleCloseEditingRest = () => {
        setOpenEditingRest(false);
    };

    const addExercise = (newExercise) => {
        let _arr = [...exercises];

        _arr.push({
            id: addedExercises,
            exercise: newExercise.exercise,
            nbSeries: newExercise.nbSeries,
            nbReps: newExercise.nbReps,
            timeRest: newExercise.timeRest,
            type: 'exercise',
        });

        setAddedExercises(addedExercises + 1);
        setExercises(_arr);
    };

    const addRest = (newRest) => {
        let _arr = [...exercises];

        _arr.push({
            id: addedExercises,
            timeRest: newRest.timeRest,
            type: 'rest',
        });

        setAddedExercises(addedExercises + 1);
        setExercises(_arr);
    };

    const editExercise = (indexEdition) => {
        if (exercises[indexEdition].type == 'rest') {
            setRestEdited(exercises[indexEdition]);
            setIndexEditRest(indexEdition);
            handleOpenEditingRest();
        } else {
            setExerciseEdited(exercises[indexEdition]);
            setIndexEditExercise(indexEdition);
            handleOpenEditingExercise();
        }
    };

    const handleEditExercise = (index, exerciseEdited) => {
        let _arr = [...exercises];

        _arr[index].exercise = exerciseEdited.exercise;
        _arr[index].nbSeries = exerciseEdited.nbSeries;
        _arr[index].nbReps = exerciseEdited.nbReps;
        _arr[index].timeRest = exerciseEdited.timeRest;

        setExercises(_arr);
    };

    const handleEditRest = (index, restEdited) => {
        let _arr = [...exercises];

        _arr[index].timeRest = restEdited.timeRest;

        setExercises(_arr);
    };

    const deleteExercise = (indexDeleted) => {
        let _arr = [...exercises];

        _arr.splice(indexDeleted, 1);

        setExercises(_arr);
    };

    const dragEnded = (param) => {
        const { source, destination } = param;
        let _arr = [...exercises];

        //extracting the source item from the list
        const _item = _arr.splice(source.index, 1)[0];
        //inserting it at the destination index.
        _arr.splice(destination.index, 0, _item);

        setExercises(_arr);
    };

    const handleSubmit = () => {
        setErrMsgName('');
        setErrMsgExercises('');

        if (!validName || !validExercises) {
            if (!validName) {
                setErrMsgName('Veuillez saisir un nom de programme valide.');
            }

            if (!validExercises) {
                setErrMsgExercises('Veuillez au moins ajouter un exercice.');
            }
            return;
        }

        const storedToken = localStorage.getItem('authToken');

        axios
            .post(
                `${API_URL}/api/workouts/`,
                {
                    name: name,
                    exercises: exercises.map((exercise) => {
                        if (exercise.type == 'exercise') {
                            return {
                                exercise: exercise.exercise._id,
                                nbSeries: exercise.nbSeries,
                                nbReps: exercise.nbReps,
                                timeRest: exercise.timeRest,
                                type: 'exercise',
                            };
                        }

                        return {
                            timeRest: exercise.timeRest,
                            type: 'rest',
                        };
                    }),
                },
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                },
            )
            .then(() => {
                navigate('/workout');
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrMsg(errorDescription);
            });
    };

    useEffect(() => {
        setValidName(ALPHANUM_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidExercises(exercises.length > 0);
    }, [exercises]);

    return (
        <>
            <ClassicPage
                pageSelectedNavbar={PAGE_SELECTED.WORKOUT}
                linkToBackButton={'/workout'}
            >
                <section
                    id="create-workout-page"
                    className="flex w-full flex-col items-center gap-3"
                >
                    <h2 className="text-xl font-bold">
                        Création d&apos;un programme
                    </h2>

                    <p
                        className={errMsgName ? 'text-red-600' : 'hidden'}
                        aria-live="assertive"
                    >
                        {errMsgName}
                    </p>
                    <label htmlFor="name">Nom du programme</label>
                    <input
                        type="text"
                        name="name"
                        className="mb-2 rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                        required
                        onChange={(event) => setName(event.target.value)}
                    />

                    <div className="flex flex-col gap-3 md:flex-row">
                        <SecondaryButton
                            buttonText={'Ajouter un exercice'}
                            onClick={handleOpenAddingExercice}
                        />
                        <SecondaryButton
                            buttonText={'Ajouter du repos'}
                            onClick={handleOpenAddingRest}
                        />
                    </div>

                    <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                        <div className="font-bold">Liste des exercices</div>
                        <p
                            className={
                                errMsgExercises ? 'text-red-600' : 'hidden'
                            }
                            aria-live="assertive"
                        >
                            {errMsgExercises}
                        </p>
                        {exercises.length == 0 ? (
                            <div className="italic text-neutral-500">
                                Aucun exercice d&apos;ajouté
                            </div>
                        ) : (
                            <DragDropContext onDragEnd={dragEnded}>
                                <Droppable droppableId="exercises-wrapper">
                                    {(provided) => (
                                        <ExercisesDraggable
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {exercises.map(
                                                (exercise, index) => {
                                                    return (
                                                        <Draggable
                                                            draggableId={`exercise-${exercise.id}`}
                                                            key={exercise.id}
                                                            index={index}
                                                        >
                                                            {(
                                                                _provided,
                                                                _snapshot,
                                                            ) => (
                                                                <ExerciseDraggable
                                                                    ref={
                                                                        _provided.innerRef
                                                                    }
                                                                    dragHandleProps={
                                                                        _provided.dragHandleProps
                                                                    }
                                                                    snapshot={
                                                                        _snapshot
                                                                    }
                                                                    exercise={
                                                                        exercise
                                                                    }
                                                                    index={
                                                                        index
                                                                    }
                                                                    deleteExercise={
                                                                        deleteExercise
                                                                    }
                                                                    editExercise={
                                                                        editExercise
                                                                    }
                                                                    {..._provided.draggableProps}
                                                                />
                                                            )}
                                                        </Draggable>
                                                    );
                                                },
                                            )}
                                            {provided.placeholder}
                                        </ExercisesDraggable>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    </div>

                    <PrimaryButton
                        buttonText={'Créer le programme'}
                        onClick={handleSubmit}
                    />
                </section>
            </ClassicPage>

            <AddExerciseModal
                open={openAddingExercice}
                close={handleCloseAddingExercice}
                addExercise={addExercise}
            />
            <AddRestModal
                open={openAddingRest}
                close={handleCloseAddingRest}
                addRest={addRest}
            />
            <EditExerciseModal
                open={openEditingExercise}
                close={handleCloseEditingExercise}
                index={indexEditExercise}
                exerciseEdited={exerciseEdited}
                handleEditExercise={handleEditExercise}
            />
            <EditRestModal
                open={openEditingRest}
                close={handleCloseEditingRest}
                index={indexEditRest}
                restEdited={restEdited}
                handleEditRest={handleEditRest}
            />
        </>
    );
}
