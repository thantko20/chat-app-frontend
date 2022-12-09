import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TContact, TDataContacts } from '../types';

const removeContact = (contactId: string): Promise<TDataContacts> => {
  return axios.delete(`/contacts/${contactId}`);
};

export const useRemoveContact = () => {
  return useMutation(removeContact);
};
