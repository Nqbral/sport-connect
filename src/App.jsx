import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';

export default function App() {
    return (
        <div className="min-h-screen bg-stone-200">
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
}
