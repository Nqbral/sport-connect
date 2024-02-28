import { Route, Routes } from 'react-router-dom';

import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';

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
            </Routes>
        </div>
    );
}
