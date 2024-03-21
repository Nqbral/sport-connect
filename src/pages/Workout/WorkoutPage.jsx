import axios from 'axios';
import { useEffect, useState } from 'react';

import LinkButton from '../../components/buttons/LinkButton';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

const API_URL = process.env.API_URL;

export default function WorkoutPage() {
    const [listWorkouts, setListWorkouts] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/workouts/owner`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setListWorkouts(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <ClassicPage pageSelectedNavbar={PAGE_SELECTED.WORKOUT}>
            <section
                id="workout-page"
                className="flex w-full flex-col items-center gap-2"
            >
                <h2 className="text-xl font-bold">Musculation</h2>
                <LinkButton
                    buttonText={'Créer un programme'}
                    linkTo={'/workout/create'}
                />

                <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                    <div className="font-bold">Liste des entraînements</div>
                    {listWorkouts.length == 0 ? (
                        <div className="italic text-neutral-500">
                            Aucun entraînement de créé
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {listWorkouts.map((workout, index) => {
                                return (
                                    <div key={workout._id}>{workout.name}</div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </ClassicPage>
    );
}
