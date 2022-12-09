import {
  Box,
  Divider,
  Heading,
  Link,
  Skeleton,
  Slide,
  SlideFade,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { IUser } from '../auth/types';
import { useConversations } from './api/useConversations';
import ConversationListItem from './ConversationListItem';

const ConversationList = () => {
  const { user } = useAuth();
  const { data, isLoading } = useConversations();

  return (
    <Box position='relative'>
      <Heading as='h2' fontSize='2xl' fontWeight='semibold'>
        Conversations
      </Heading>
      <VStack
        alignItems='stretch'
        mt={2}
        divider={<StackDivider />}
        gap={isLoading ? 2 : 0}
      >
        {isLoading && (
          <>
            <Skeleton h={10} />
            <Skeleton h={10} />
            <Skeleton h={10} />
            <Skeleton h={10} />
          </>
        )}
        {data?.conversations.map((conversation) => {
          const toUser = conversation.participants.find(
            (participant) => user?.id !== participant.id,
          ) as IUser;
          return (
            <ConversationListItem
              key={conversation.id}
              toUser={toUser}
              conversation={conversation}
            />
          );
        })}
      </VStack>
    </Box>
  );
};

export default ConversationList;
