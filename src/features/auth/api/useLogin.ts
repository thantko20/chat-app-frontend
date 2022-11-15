import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TLoginForm } from '../LoginForm';
import { IUser } from '../types';

export type TLoginFormReturn = {
  token: string;
  user: IUser;
};

const login = (formData: TLoginForm): Promise<TLoginFormReturn> => {
  return axios.post('/auth/login', formData);
};

export const useLogin = () => {
  return useMutation(login);
};
