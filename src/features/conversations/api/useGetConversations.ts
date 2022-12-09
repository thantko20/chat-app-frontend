import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { TSucessResponseDataType } from '../../../types';
import { TDataConversationCards } from '../types';

const getConversations = (): Promise<TDataConversationCards> => {
  return axios.get('/conversations');
};

export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  });
};
