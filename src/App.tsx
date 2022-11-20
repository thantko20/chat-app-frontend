import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './features/auth/AuthProvider';

const Header = () => {
  return (
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
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
