import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocket } from '../../../lib/socket';
import { IConversationCard } from '../types';
import { useGetConversations } from './useGetConversations';

export const useConversations = () => {
  const { data, isLoading, ...rest } = useGetConversations();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      socket.on(
        'conversation_update',
        ({ conversation }: { conversation: IConversationCard }) => {
          const conversationIndex = data.findIndex(
            (con) => con.id === conversation.id,
          );
          if (conversationIndex >= 0) {
            queryClient.setQueryData(
              ['conversations'],
              (oldData: IConversationCard[] | undefined) => {
                if (oldData) {
                  const tempData = [...oldData];
                  tempData[conversationIndex] = conversation;
                  return tempData;
                }
              },
            );
          } else {
            queryClient.invalidateQueries(['conversations']);
          }
        },
      );
    }

    return () => {
      socket.off('conversations');
    };
  }, [data]);

  return { data, isLoading, ...rest };
};
