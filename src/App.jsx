import { Route, Routes } from 'react-router-dom';

import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/Profile/EditProfilePage';
import ProfilePage from './pages/Profile/ProfilePage';
import CreateWorkoutPage from './pages/Workout/CreateWorkoutPage';
import EditWorkoutPage from './pages/Workout/EditWorkoutPage';
import WorkoutDetailPage from './pages/Workout/WorkoutDetailPage';
import WorkoutListPage from './pages/Workout/WorkoutListPage';

export default function App() {
    return (
        <div className="min-h-screen bg-stone-200">
            <Routes>
                <Route
                    path="/"
                    element={
                        <IsAnon>
                            <HomePage />
                        </IsAnon>
                    }
                />
                <Route
                    path="/feed"
                    element={
                        <IsPrivate>
                            <FeedPage />
                        </IsPrivate>
                    }
                />
                <Route
                    path="/workout"
                    element={
                        <IsPrivate>
                            <WorkoutListPage />
                        </IsPrivate>
                    }
                />
                <Route
                    path="/workout/:workoutId"
                    element={
                        <IsPrivate>
                            <WorkoutDetailPage />
                        </IsPrivate>
                    }
                />
                <Route
                    path="/workout/create"
                    element={
                        <IsPrivate>
                            <CreateWorkoutPage />
                        </IsPrivate>
                    }
                />
                <Route
                    path="/workout/edit/:workoutId"
                    element={
                        <IsPrivate>
                            <EditWorkoutPage />
                        </IsPrivate>
                    }
                />
                <Route
                    path="/profile/:username"
                    element={
                        <IsPrivate>
                            <ProfilePage />
                        </IsPrivate>
                    }
                />
                <Route
                    path="/profile/edit"
                    element={
                        <IsPrivate>
                            <EditProfilePage />
                        </IsPrivate>
                    }
                />
            </Routes>
        </div>
    );
}
