import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContactInfo } from '../types';

const addContact = (userId: string): Promise<TContactInfo> => {
  return axios.post(`/contacts/add/${userId}`);
};

export const useAddContact = () => {
  return useMutation(addContact);
};
