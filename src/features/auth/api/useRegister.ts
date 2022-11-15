import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TRegisterForm } from '../RegisterForm';
import { IUser } from '../types';

export const register = (formData: TRegisterForm): Promise<IUser> => {
  return axios.post('/auth/register', formData);
};

export const useRegister = () => {
  return useMutation(register);
};
