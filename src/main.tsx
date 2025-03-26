import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import i18n from "./i18n";
import {I18nextProvider} from "react-i18next";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback="Loading...">
            <I18nextProvider i18n={i18n}>
                <App/>
            </I18nextProvider>
        </Suspense>
    </StrictMode>
);