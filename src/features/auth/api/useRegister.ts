import axios from '../../../lib/axios';
import storage from '../../../utils/storage';
import { IRegisterFormData } from '../types';

const register = async (formData: IRegisterFormData) => {
  try {
    if (!storage.getToken()) {
      throw new Error('Not logged in.');
    }
    const res = await axios.post('/auth/register', formData);
    console.log(res);
  } catch (err) {
    console.log((err as Error).message);
  }
};

export const useRegister = () => {
  return register;
};
