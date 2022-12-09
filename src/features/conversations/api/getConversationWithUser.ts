import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from '../../../lib/axios';
import { useSocket } from '../../../lib/socket';
import { IConversation, IMessage, TDataConversation } from '../types';

const getFriendConversation = (
  friendId: string,
): Promise<TDataConversation | null | undefined> => {
  return axios.get(`/conversations/friend/${friendId}`);
};

export const useGetFriendConversation = (friendId: string) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['conversations', 'friend', friendId],
    queryFn: () => getFriendConversation(friendId),
  });

  const queryClient = useQueryClient();
  const socket = useSocket();

  useEffect(() => {
    const receiveMessageHandler = ({ message }: { message: IMessage }) => {
      const conversationExists = queryClient.getQueryData([
        'conversations',
        'friend',
        friendId,
      ]);
      if (!conversationExists) {
        queryClient.invalidateQueries(['conversations', 'friend', friendId]);
        queryClient.invalidateQueries(['conversations']);
        return;
      }

      queryClient.setQueryData(
        ['conversations', 'friend', friendId],
        (oldData: TDataConversation | undefined) => {
          if (oldData) {
            const newMessages = [message, ...oldData.conversation.messages];
            return {
              ...oldData,
              conversation: {
                ...oldData.conversation,
                messages: newMessages,
              },
            };
          }
        },
      );

      queryClient.invalidateQueries(['conversations']);
    };
    socket.on('send_message', receiveMessageHandler);
    return () => {
      socket.off('send_message', receiveMessageHandler);
    };
  }, []);

  return {
    data,
    ...restQuery,
  };
};
