import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContactInfo } from '../types';

const removeContact = (contactId: string): Promise<TContactInfo[]> => {
  return axios.post(`/contacts/delete/${contactId}`);
};

export const useRemoveContact = () => {
  return useMutation(removeContact);
};
