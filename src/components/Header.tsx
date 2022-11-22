import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../features/auth/api/useLogout';
import { useAuth } from '../features/auth/AuthProvider';
import { Button } from './Button';

const Header = () => {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <header>
      <div className='sm:container mx-auto px-2 py-4 flex justify-between'>
        <span className='font-bold text-3xl text-blue-600'>Logo</span>
        <nav className='flex gap-4 items-center'>
          {user && (
            <ul className='flex gap-6'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/friends'>Friends</Link>
              </li>
            </ul>
          )}
          <div className='flex gap-2'>
            {user ? (
              <>
                <Button onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/auth/login')}>Login</Button>
                <Button onClick={() => navigate('/auth/register')}>
                  Register
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
