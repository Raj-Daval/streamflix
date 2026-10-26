import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { store } from './app/store';
import { router } from './app/router';
// import { PreferencesProvider } from './context/PreferencesContext';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <PreferencesProvider>
        <RouterProvider router={router} />
      </PreferencesProvider> */}
    </Provider>
  </React.StrictMode>
);
