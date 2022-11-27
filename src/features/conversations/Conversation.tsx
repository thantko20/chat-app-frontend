import {
  Box,
  Flex,
  IconButton,
  Input,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useSocket } from '../../lib/socket';
import { IUser } from '../auth/types';
import { useGetFriendConversation } from './api/useGetFriendConversation';
import { IConversation, IMessage } from './types';

const MessageInput = ({ friendId }: { friendId: string }) => {
  const [text, setText] = useState('');
  const socket = useSocket();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;

    socket.emit(
      'send_message',
      { message: text, toUserId: friendId },
      (responseData: any) => {
        setText('');
      },
    );
  };

  return (
    <Flex as='form' onSubmit={onSubmit}>
      <Input
        type='text'
        name='message'
        value={text}
        variant='flushed'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder='Type your message here.'
      />
      <IconButton
        icon={<FiSend />}
        aria-label='send message'
        type='submit'
        colorScheme='green'
        ml={2}
      />
    </Flex>
  );
};

export type ConversationProps = {
  friendId: string;
  friend: IUser;
};

export const Conversation = ({ friendId, friend }: ConversationProps) => {
  const { data, isLoading } = useGetFriendConversation(friend.id);
  const queryClient = useQueryClient();
  const socket = useSocket();
  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollToBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  useEffect(() => {
    socket.on('send_message', ({ message }: { message: IMessage }) => {
      const conversationExists = queryClient.getQueryData([
        'conversations',
        'friend',
        friendId,
      ]);
      if (!conversationExists) {
        queryClient.invalidateQueries(['conversations', 'friend', friendId]);
        return;
      }

      queryClient.setQueryData(
        ['conversations', 'friend', friendId],
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              messages: [message, ...(oldData as IConversation).messages],
            };
          }
        },
      );
    });
    return () => {
      socket.off('send_message');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  return (
    <Box>
      <Box
        fontSize='lg'
        fontWeight='semibold'
        p={2}
        bgColor='green.500'
        color='whiteAlpha.900'
        rounded='sm'
        boxShadow='lg'
      >
        @{friend.handleName}
      </Box>
      {isLoading && (
        <VStack>
          <Skeleton h={16} w='full' />
          <Skeleton h={16} w='full' />
          <Skeleton h={16} w='full' />
        </VStack>
      )}
      <Box
        h='calc(100vh - 14rem)'
        overflow='auto'
        borderBottom={1}
        borderColor='blackAlpha.700'
      >
        {data === null ? (
          <>Start a conversation por favor</>
        ) : (
          <Flex
            overflow='auto'
            py={4}
            direction='column-reverse'
            gap={2}
            h='full'
          >
            {data?.messages.map((msg, idx) => {
              const isFriendMsg = msg.senderId === friendId;
              const isLastMsg = idx === 0;

              return (
                <Box
                  bgColor={isFriendMsg ? 'gray.200' : 'green.500'}
                  p={2}
                  rounded='2xl'
                  alignSelf={isFriendMsg ? 'flex-start' : 'flex-end'}
                  maxW='60%'
                  ref={isLastMsg ? scrollToBottomRef : null}
                  key={msg.id}
                >
                  <Text
                    key={msg.id}
                    color={isFriendMsg ? 'gray.800' : 'whiteAlpha.900'}
                    fontSize='sm'
                  >
                    {msg.text}
                  </Text>
                </Box>
              );
            })}
          </Flex>
        )}
      </Box>
      <MessageInput friendId={friendId} />
    </Box>
  );
};
