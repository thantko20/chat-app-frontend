import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContact, TDataContact } from '../types';

const addContact = (userId: string): Promise<TDataContact> => {
  return axios.post(`/contacts/${userId}`);
};

export const useAddContact = () => {
  return useMutation(addContact);
};
