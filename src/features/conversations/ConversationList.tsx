import {
  Box,
  Divider,
  Heading,
  Link,
  Skeleton,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useGetConversations } from './api/useGetConversations';
import { useSocket } from '../../lib/socket';
import { IConversationCard } from './types';
import { useQueryClient } from '@tanstack/react-query';

const ConversationList = () => {
  const { data, isLoading } = useGetConversations();
  const { user } = useAuth();
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
  return (
    <Box>
      <Heading as='h2' fontSize='3xl' fontWeight='semibold'>
        Conversations
      </Heading>
      <VStack alignItems='stretch' mt={2} divider={<StackDivider />}>
        {isLoading && (
          <>
            <Skeleton h={10} />
            <Skeleton h={10} />
            <Skeleton h={10} />
            <Skeleton h={10} />
          </>
        )}
        {data?.map((conversation) => {
          const contactUser = conversation.participants.find(
            (participant) => user?.id !== participant.id,
          );
          return (
            <Box
              p={4}
              as={RouterLink}
              to={`/conversations/contacts/${contactUser?.id}`}
              transition='background-color 200ms ease-in, color 100ms ease-in'
              _hover={{
                bgColor: 'gray.100',
              }}
              state={{ contactUser }}
              key={conversation.id}
            >
              <Heading as='h3' fontSize='xl' fontWeight='semibold'>
                {contactUser?.handleName}
              </Heading>
              <Text mt={4}>
                {contactUser?.id !== user?.id ? 'You: ' : ''}
                <Box as='span' fontStyle='italic' fontWeight='semibold'>
                  {conversation.lastMessage?.text}
                </Box>
              </Text>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default ConversationList;
