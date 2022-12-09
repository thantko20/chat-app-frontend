import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TSucessResponseDataType } from '../../../types';
import { TLoginForm } from '../LoginForm';
import { IUser } from '../types';

type ReturnAuthInfo = {
  userId: string;
  token: string;
};

export type TLoginReturn = TSucessResponseDataType<ReturnAuthInfo, 'authInfo'>;

const login = (formData: TLoginForm): Promise<TLoginReturn> => {
  return axios.post('/auth/login', formData);
};

export const useLogin = () => {
  return useMutation(login);
};
