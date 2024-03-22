import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import WorkoutForm from '../../components/WorkoutForm';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

const API_URL = process.env.API_URL;

export default function EditWorkoutPage() {
    const { workoutId } = useParams();
    const [editedWorkout, setEditedWorkout] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/workouts/${workoutId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => setEditedWorkout(response.data))
            .catch((error) => console.log(error));
    }, [workoutId]);

    return (
        <>
            <ClassicPage
                pageSelectedNavbar={PAGE_SELECTED.WORKOUT}
                linkToBackButton={'/workout'}
                sectionId={'section-edit-workout-page'}
            >
                <h2 className="text-xl font-bold">
                    Édition d&apos;un programme
                </h2>

                <WorkoutForm isCreation={false} editedWorkout={editedWorkout} />
            </ClassicPage>
        </>
    );
}
