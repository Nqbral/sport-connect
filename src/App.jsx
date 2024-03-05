import { Route, Routes } from 'react-router-dom';

import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profile/ProfilePage';
import CreateWorkoutPage from './pages/Workout/CreateWorkoutPage';
import WorkoutPage from './pages/Workout/WorkoutPage';

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
                            <WorkoutPage />
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
                    path="/profile"
                    element={
                        <IsPrivate>
                            <ProfilePage />
                        </IsPrivate>
                    }
                />
            </Routes>
        </div>
    );
}
