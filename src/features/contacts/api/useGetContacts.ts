import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContact, TDataContact, TDataContacts } from '../types';

const getContacts = (): Promise<TDataContacts> => {
  return axios.get('/contacts');
};

export const useGetContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });
};
