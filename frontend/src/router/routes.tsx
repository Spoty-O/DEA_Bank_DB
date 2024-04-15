import React from 'react';
import MainPage from '../pages/index';
import Users from '../pages/Users';

export const publicRoutes = [
  { path: '/', component: <MainPage /> },
  { path: '/users', component: <Users /> },
];
