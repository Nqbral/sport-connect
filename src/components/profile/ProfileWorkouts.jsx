import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.API_URL;

export default function ProfileWorkouts({ userPage }) {
    const [listWorkouts, setListWorkouts] = useState([]);

    useEffect(() => {
        if (userPage != null) {
            const storedToken = localStorage.getItem('authToken');

            axios
                .get(`${API_URL}/api/workouts/user/${userPage._id}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    setListWorkouts(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [userPage]);

    return (
        <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
            <div className="font-bold">Liste des entraînements</div>
            {listWorkouts.length == 0 ? (
                <div className="italic text-neutral-500">
                    Aucun entraînement de créé
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3">
                    {listWorkouts.map((workout) => {
                        return (
                            <Link
                                key={workout._id}
                                to={`/workout/${workout._id}`}
                            >
                                <div className="shadow-neutral flex min-w-64 flex-row justify-center rounded-md p-4 shadow-md md:w-1/2">
                                    <div>{workout.name}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
