import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContact } from '../types';

const addContact = (userId: string): Promise<TContact> => {
  return axios.post(`/contacts/add/${userId}`);
};

export const useAddContact = () => {
  return useMutation(addContact);
};
