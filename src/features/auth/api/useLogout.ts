import { useNavigate } from 'react-router-dom';
import storage from '../../../utils/storage';

export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    storage.clearToken();
    navigate('/auth/login');
  };
};
