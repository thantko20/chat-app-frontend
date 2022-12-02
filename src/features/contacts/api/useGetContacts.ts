import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContactInfo } from '../types';

const getContacts = (): Promise<TContactInfo[]> => {
  return axios.get('/contacts');
};

export const useGetContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });
};
