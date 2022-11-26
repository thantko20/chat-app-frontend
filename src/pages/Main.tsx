import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';

const MainPage = () => {
  const { user, isCheckingUser } = useAuth();

  if (isCheckingUser) {
    return <>Loading</>;
  }

  if (user) {
    return (
      <div>
        <h2>Main Page</h2>
      </div>
    );
  }

  return <Navigate to='/auth/login' />;
};

export default MainPage;
