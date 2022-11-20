import { ReactNode } from 'react';
import { createBrowserRouter, Navigate, RouteProps } from 'react-router-dom';
import App from './App';
import { useAuth } from './features/auth/AuthProvider';
import Conversation from './pages/Conversation';
import Friends from './pages/Friends';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

type ConditionalRouteProps = {
  routeType: 'auth' | 'protected';
  page: ReactNode;
};

const ConditionalRoute = ({
  routeType = 'auth',
  page,
}: ConditionalRouteProps) => {
  const { user, isCheckingUser } = useAuth();

  if (isCheckingUser) {
    return <p>Loading Wait mtfk</p>;
  }

  return (
    <>
      {routeType === 'auth' ? (
        user ? (
          <Navigate to='/' />
        ) : (
          page
        )
      ) : user ? (
        page
      ) : (
        <Navigate to='/auth/login' />
      )}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ConditionalRoute page={<Main />} routeType='protected' />,
      },
      {
        path: 'conversations/:friendId',
        element: (
          <ConditionalRoute page={<Conversation />} routeType='protected' />
        ),
      },
      {
        path: 'friends',
        element: <ConditionalRoute page={<Friends />} routeType='protected' />,
      },
      {
        path: 'auth/register',
        element: <ConditionalRoute page={<Register />} routeType='auth' />,
      },
      {
        path: 'auth/login',
        element: <ConditionalRoute page={<Login />} routeType='auth' />,
      },
    ],
  },
]);

export default router;
