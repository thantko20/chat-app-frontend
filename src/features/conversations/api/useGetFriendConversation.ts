import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { IConversation } from '../types';

const getFriendConversation = (
  friendId: string,
): Promise<IConversation | null | undefined> => {
  return axios.get(`/conversations/${friendId}`);
};

export const useGetFriendConversation = (friendId: string) => {
  return useQuery({
    queryKey: ['conversations', friendId],
    queryFn: () => getFriendConversation(friendId),
  });
};
