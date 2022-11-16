import { useNavigate } from 'react-router-dom';
import storage from '../../../utils/storage';
import { useAuth } from '../AuthProvider';

export const useLogout = () => {
  const navigate = useNavigate();
  const { removeAuth } = useAuth();
  return () => {
    storage.clearToken();
    removeAuth();
    navigate('/auth/login');
  };
};
