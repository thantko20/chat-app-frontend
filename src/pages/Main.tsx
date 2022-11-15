import { Button } from '../components/Button';
import { useLogout } from '../features/auth/api/useLogout';

const Main = () => {
  const logout = useLogout();
  return (
    <div>
      Main Page
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Main;
