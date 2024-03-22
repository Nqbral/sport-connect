import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LinkButton from '../../components/buttons/LinkButton';
import RedButton from '../../components/buttons/RedButton';
import ExerciseListTile from '../../components/list_tile/Exercise';
import { AuthContext } from '../../context/auth.context';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

const API_URL = process.env.API_URL;

export default function WorkoutDetailPage() {
    const { workoutId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [workout, setWorkout] = useState(null);
    const [isCreatedUser, setIsCreatedUser] = useState(false);

    // Delete the workout using the _id of the workout
    const deleteWorkout = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .delete(`${API_URL}/api/workouts/${workoutId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                navigate('/workout');
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/workouts/${workoutId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setWorkout(response.data);
                setIsCreatedUser(user.userId == response.data.create_user._id);
            })
            .catch((error) => console.log(error));
    }, [workoutId]);

    return (
        <>
            <ClassicPage
                pageSelectedNavbar={PAGE_SELECTED.WORKOUT}
                sectionId={'section-workout-detail-page'}
            >
                {workout == null ? (
                    <>loading</>
                ) : (
                    <>
                        <h2 className="text-xl font-bold">{workout.name}</h2>
                        <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                            <div className="font-bold">Liste des exercices</div>
                            <ul className="min-w-64 rounded-lg border-2 border-neutral-400 md:w-5/6 md:min-w-72">
                                {workout.exercises.map((exercise, index) => {
                                    return (
                                        <ExerciseListTile
                                            exercise={exercise}
                                            index={index}
                                            key={'key_' + index}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                        {isCreatedUser ? (
                            <div className="flex flex-row gap-3">
                                <RedButton
                                    buttonText={'Supprimer'}
                                    onClick={deleteWorkout}
                                >
                                    Supprimer
                                </RedButton>
                                <LinkButton
                                    buttonText={'Éditer'}
                                    primary={false}
                                    linkTo={`/workout/edit/${workout._id}`}
                                ></LinkButton>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </ClassicPage>
        </>
    );
}
