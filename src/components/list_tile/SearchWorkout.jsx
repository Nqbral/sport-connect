import { Link } from 'react-router-dom';

import userLogo from '../../assets/user.png';

export default function SearchWorkout({ workout }) {
    console.log(workout);
    return (
        <>
            <Link to={`/workout/${workout._id}`}>
                <div className="shadow-neutral flex min-w-64 flex-col justify-center gap-2 rounded-md p-4 shadow-md md:w-1/2">
                    <div className="flex flex-row items-center gap-2">
                        <img src={userLogo} className="h-8" alt="user_logo" />
                        <div>@{workout.create_user.name}</div>
                    </div>
                    <div>{workout.name}</div>
                    <div className="text-sm text-neutral-400">
                        {workout.exercises.length} exercice(s)
                    </div>
                </div>
            </Link>
        </>
    );
}
