import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './features/auth/AuthProvider';

const App = () => {
  const { isCheckingUser } = useAuth();

  return (
    <div>
      {!isCheckingUser ? (
        <>
          <nav>
            <ul>
              <li>
                <Link to='/' className='text-blue-500 underline cursor-pointer'>
                  Main
                </Link>
              </li>
              <li>
                <Link
                  to='/friends'
                  className='text-blue-500 underline cursor-pointer'
                >
                  Friends
                </Link>
              </li>
              <li>
                <Link
                  to='/auth/login'
                  className='text-blue-500 underline cursor-pointer'
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to='/auth/register'
                  className='text-blue-500 underline cursor-pointer'
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </>
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default App;
