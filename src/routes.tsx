import { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { useAuth } from './features/auth/AuthProvider';
import ConversationPage from './pages/Conversation';
import FriendsPage from './pages/Friends';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import RegisterPage from './pages/Register';

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
    return (
      <div className='fixed inset-0 bg-blue-300 flex justify-center items-center text-red-400 text-3xl'>
        We're checking the auth state mtfk
      </div>
    );
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
        element: <ConditionalRoute page={<MainPage />} routeType='protected' />,
      },
      {
        path: 'conversations/friend/:friendId',
        element: (
          <ConditionalRoute page={<ConversationPage />} routeType='protected' />
        ),
      },
      {
        path: 'friends',
        element: (
          <ConditionalRoute page={<FriendsPage />} routeType='protected' />
        ),
      },
      {
        path: 'auth/register',
        element: <ConditionalRoute page={<RegisterPage />} routeType='auth' />,
      },
      {
        path: 'auth/login',
        element: <ConditionalRoute page={<LoginPage />} routeType='auth' />,
      },
    ],
  },
]);

export default router;
