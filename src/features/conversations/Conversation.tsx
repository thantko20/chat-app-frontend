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
import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSend } from 'react-icons/fi';
import { useSocket } from '../../lib/socket';
import { IUser } from '../auth/types';
import { useGetFriendConversation } from './api/useGetFriendConversation';
import { IConversation, IMessage } from './types';

const MessageInput = ({ friendId }: { friendId: string }) => {
  const [text, setText] = useState('');
  const socket = useSocket();

  return (
    <Flex>
      <Input
        type='text'
        name='message'
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <IconButton
        icon={<FiSend />}
        aria-label='send message'
        onClick={() => {
          if (!text) return;

          socket.emit(
            'send_message',
            { message: text, toUserId: friendId },
            (responseData: any) => {
              toast('Message sent somehow.');
            },
          );
        }}
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

  useEffect(() => {
    socket.on('send_message', ({ message }: { message: IMessage }) => {
      toast('Message received.');
      const conversationExists = queryClient.getQueryData([
        'conversations',
        friendId,
      ]);
      if (!conversationExists) {
        console.log('Conversation does not exist.');
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
    !isLoading && console.log(data?.messages);
  }, [isLoading]);

  return (
    <Box>
      <Box fontSize='lg' fontWeight='medium' mb={4}>
        @{friend.handleName}
      </Box>
      {isLoading && (
        <VStack>
          <Skeleton h={16} w='full' />
          <Skeleton h={16} w='full' />
          <Skeleton h={16} w='full' />
        </VStack>
      )}

      {data === null ? (
        <>Start a conversation por favor</>
      ) : (
        <VStack overflow='auto'>
          {data?.messages
            .slice(0)
            .reverse()
            .map((msg) => {
              const isFriendMsg = msg.senderId === friendId;

              return (
                <Box
                  bgColor={isFriendMsg ? 'gray.200' : 'blue.400'}
                  p={1}
                  rounded='base'
                >
                  <Text
                    key={msg.id}
                    color={isFriendMsg ? 'gray.800' : 'whiteAlpha.900'}
                  >
                    {msg.text}
                  </Text>
                </Box>
              );
            })}
        </VStack>
      )}
      <MessageInput friendId={friendId} />
    </Box>
  );
};
