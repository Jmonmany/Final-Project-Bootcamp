import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import { App } from './core/components/app/app';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { ArtworkContextProvider } from './core/context/artworks.provider';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/* <ArtworkContextProvider>
            <Router>
                <App />
            </Router>
        </ArtworkContextProvider> */}
    </React.StrictMode>
);
reportWebVitals();
