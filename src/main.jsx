import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { AuthProviderWrapper } from './context/auth.context.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProviderWrapper>
            <App />
        </AuthProviderWrapper>
    </BrowserRouter>,
);
