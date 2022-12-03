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
import { IUser } from '../auth/types';
import { useConversations } from './api/useConversations';
import ConversationListItem from './ConversationListItem';

const ConversationList = () => {
  const { user } = useAuth();
  const { data, isLoading } = useConversations();

  return (
    <Box>
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
        {data?.map((conversation) => {
          const toUser = conversation.participants.find(
            (participant) => user?.id !== participant.id,
          ) as IUser;
          return (
            <ConversationListItem toUser={toUser} conversation={conversation} />
          );
        })}
      </VStack>
    </Box>
  );
};

export default ConversationList;
