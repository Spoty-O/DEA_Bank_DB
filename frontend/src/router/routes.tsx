import React from 'react';
import MainPage from '../pages/index';
import ClientData from '../components/ClientData';

export const publicRoutes = [
  { path: '/', component: <MainPage /> },
  { path: '/client/:id', component: <ClientData /> },
];
