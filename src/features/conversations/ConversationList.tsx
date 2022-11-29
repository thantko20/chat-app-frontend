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
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useGetConversations } from './api/useGetConversations';

const ConversationList = () => {
  const { data, isLoading } = useGetConversations();
  const { user } = useAuth();
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
          const friend = conversation.participants.find(
            (participant) => user?.id !== participant.id,
          );
          return (
            <Box
              p={4}
              as={RouterLink}
              to={`/conversations/friend/${friend?.id}`}
              transition='background-color 200ms ease-in, color 100ms ease-in'
              _hover={{
                bgColor: 'gray.100',
              }}
              state={{ friend }}
            >
              <Heading as='h3' fontSize='xl' fontWeight='semibold'>
                {friend?.handleName}
              </Heading>
              <Text mt={4}>
                {friend?.id !== user?.id ? 'You: ' : ''}
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
