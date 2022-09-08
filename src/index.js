import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { fireBaseApp, FieldValue } from './library/firebase_config';

import FireBaseContext from './context/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FireBaseContext.Provider value={{fireBaseApp, FieldValue}}>
    <App />
    </FireBaseContext.Provider>
  </React.StrictMode>
);
