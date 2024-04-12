import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {  createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Main from './pages/Main';
//TODO: remove router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
