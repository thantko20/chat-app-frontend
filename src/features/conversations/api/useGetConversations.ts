import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { IConversationCard } from '../types';

const getConversations = (): Promise<IConversationCard[]> => {
  return axios.get('/conversations');
};

export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  });
};
