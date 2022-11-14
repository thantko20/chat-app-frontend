import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { IRegisterFormData, IUser } from '../types';

export const register = (formData: IRegisterFormData): Promise<IUser> => {
  return axios.post('/auth/register', formData);
};

export const useRegister = () => {
  return useMutation(register);
};
