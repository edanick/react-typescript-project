import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';


import axios, { InternalAxiosRequestConfig } from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './main.css';
// import './index.css';
import { getToken } from './service/storageService';
import Router from './routes/Router';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProivder } from './contexts/AuthContext';

axios.defaults.baseURL = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/';
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) config.headers['x-auth-token'] = token;
  return config;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProivder>
      <ThemeProvider>
          <RouterProvider router={Router} />
      </ThemeProvider>
    </AuthProivder>
  </React.StrictMode>,
)
