import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Conversation from './pages/Conversation';
import Friends from './pages/Friends';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'conversations/:friendId',
        element: <Conversation />,
      },
      {
        path: 'friends',
        element: <Friends />,
      },
      {
        path: 'auth/register',
        element: <Register />,
      },
      {
        path: 'auth/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
