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

type ConversationListItemProps = {
  toUser: IUser;
  conversation: IConversationCard;
};

const ConversationListItem = (props: ConversationListItemProps) => {
  const { toUser, conversation } = props;
  const { user } = useAuth();
  return (
    <Box
      p={4}
      as={RouterLink}
      to={`/conversations/contacts/${toUser?.id}`}
      transition='background-color 200ms ease-in, color 100ms ease-in'
      _hover={{
        bgColor: 'gray.100',
      }}
      state={{ contactUser: toUser }}
      key={conversation.id}
      rounded='base'
    >
      <Heading as='h3' fontSize='xl' fontWeight='semibold'>
        {`${toUser?.firstName} ${toUser?.lastName}`}
      </Heading>
      <Text
        mt={2}
        fontSize='sm'
        color='gray.600'
        overflow='hidden'
        whiteSpace='nowrap'
        textOverflow='ellipsis'
      >
        {conversation.lastMessage?.senderId === user?.id && (
          <Box as='span' fontWeight='semibold'>
            You:{' '}
          </Box>
        )}
        <Box as='span' fontStyle='italic'>
          {conversation.lastMessage?.text}
        </Box>
      </Text>
    </Box>
  );
};

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
