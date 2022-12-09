import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContact } from '../types';

const removeContact = (contactId: string): Promise<TContact[]> => {
  return axios.post(`/contacts/delete/${contactId}`);
};

export const useRemoveContact = () => {
  return useMutation(removeContact);
};
