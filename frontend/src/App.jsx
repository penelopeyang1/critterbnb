import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation'; //FIXED THE CREATE A SPOT LINK NOT SHOWING UP HERE
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';

import Home from './components/Home';
import SpotDetail from './components/SpotDetail';
import CreateSpot from './components/CreateSpot';
import ManageSpots from './components/ManageSpots';
import UpdateSpot from './components/UpdateSpot';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail />
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      },
      {
        path: '/spots',
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId/update',
        element: <UpdateSpot />
      }
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
