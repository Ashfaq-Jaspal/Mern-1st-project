import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    // </StrictMode>
);
