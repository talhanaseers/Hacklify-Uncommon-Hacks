import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
//Pages
import Homepage from './Components/Pages/HomePage';
import Matchmaking from './Components/Pages/Matchmaking';
import Profile from './Components/Pages/Profile';
import UpcomingHackathons from './Components/Pages/UpcomingHackathons';
import ErrorPage from './Components/Pages/ErrorPage';
import About from './Components/Pages/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    // This page will render if a route is not found
    errorElement: <ErrorPage />,
  },
  {
    path: "/matchMaking",
    element: <Matchmaking/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/homepage",
    element: <Homepage/>,
  },
  {
    path: "/upcomingHackathons",
    element: <UpcomingHackathons/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
