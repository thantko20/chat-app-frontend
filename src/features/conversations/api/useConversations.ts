import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocket } from '../../../lib/socket';
import {
  IConversationCard,
  TDataConversation,
  TDataConversationCards,
  TDataConversations,
} from '../types';
import { useGetConversations } from './useGetConversations';

export const useConversations = () => {
  const { data, isLoading, ...rest } = useGetConversations();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.conversations) {
      socket.on(
        'conversation_update',
        ({ conversation }: { conversation: IConversationCard }) => {
          const conversationIndex = data.conversations.findIndex(
            (con) => con.id === conversation.id,
          );
          if (conversationIndex >= 0) {
            queryClient.setQueryData(
              ['conversations'],
              (oldData: TDataConversationCards | undefined) => {
                if (oldData) {
                  const tempData = [...oldData.conversations];
                  tempData[conversationIndex] = conversation;
                  return {
                    conversations: tempData,
                  };
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
