import {
  Box,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ChangeEvent,
  FormEvent,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { useSocket } from '../../lib/socket';
import { IUser } from '../auth/types';
import { useGetFriendConversation } from './api/useGetFriendConversation';
import { IConversation, IMessage } from './types';
import toast from 'react-hot-toast';
import { IoIosArrowBack } from 'react-icons/io';

const MessageInput = ({ friendId }: { friendId: string }) => {
  const [text, setText] = useState('');
  const socket = useSocket();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;

    const message = text;
    setText('');

    socket.emit(
      'send_message',
      { message, toUserId: friendId },
      (responseData: any) => {
        if (responseData.status.ok) {
          toast('Message sent');
        } else {
          toast('On no. Message was not sent.');
        }
      },
    );
  };

  return (
    <Flex
      as='form'
      onSubmit={onSubmit}
      p={4}
      bgColor='blackAlpha.400'
      rounded='2xl'
      alignItems='center'
    >
      <Input
        type='text'
        name='message'
        value={text}
        variant='flushed'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder='Type your message here.'
        autoComplete='false'
        pr={2}
        size='md'
      />
      <IconButton
        icon={<FiSend />}
        aria-label='send message'
        type='submit'
        ml={2}
        size='sm'
        colorScheme='green'
        rounded='full'
        isDisabled={!text}
      />
    </Flex>
  );
};

export type ConversationProps = {
  userId: string;
  contactUser: IUser;
};

export const Conversation = ({
  userId: friendId,
  contactUser: friend,
}: ConversationProps) => {
  const { data, isLoading } = useGetFriendConversation(friend.id);
  const queryClient = useQueryClient();
  const socket = useSocket();
  const scrollToBottomRef = useRef<HTMLDivElement>(null);
  const [animationParent] = useAutoAnimate();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    scrollToBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  useEffect(() => {
    const receiveMessageHandler = ({ message }: { message: IMessage }) => {
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
        (oldData: IConversation | undefined) => {
          if (oldData) {
            return {
              ...oldData,
              messages: [message, ...oldData.messages],
            };
          }
        },
      );
    };
    socket.on('send_message', receiveMessageHandler);
    return () => {
      socket.off('send_message', receiveMessageHandler);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  return (
    <Grid
      gridTemplateRows='min-content 1fr min-content'
      position='fixed'
      inset={0}
      maxW='2xl'
      h='100vh'
      mx='auto'
      pb={3}
      alignItems='stretch'
    >
      <HStack
        p={2}
        bgColor='green.500'
        color='whiteAlpha.900'
        rounded='sm'
        boxShadow='lg'
      >
        <IconButton
          icon={<IoIosArrowBack />}
          aria-label='go back'
          onClick={() => navigate(-1)}
          variant='ghost'
          colorScheme='blackAlpha'
          color='white'
          rounded='full'
        />
        <Box fontSize='lg' fontWeight='semibold'>
          @{friend.handleName}
        </Box>
      </HStack>

      <Box
        overflow='auto'
        borderBottom={1}
        borderColor='blackAlpha.700'
        mb={2}
        px={2}
      >
        <Flex
          overflow='auto'
          py={4}
          direction='column-reverse'
          gap={3}
          h='full'
          ref={animationParent as LegacyRef<HTMLDivElement>}
        >
          {isLoading ? (
            <>
              <Skeleton h={16} w='60%' rounded='base' alignSelf='flex-start' />
              <Skeleton h={16} w='60%' rounded='base' alignSelf='flex-end' />
              <Skeleton h={16} w='60%' rounded='base' alignSelf='flex-end' />
              <Skeleton h={16} w='60%' rounded='base' alignSelf='flex-start' />
              <Skeleton h={16} w='60%' rounded='base' alignSelf='flex-end' />
            </>
          ) : !data ? (
            <Text textAlign='center'>Start a conversation.</Text>
          ) : (
            data?.messages.map((msg, idx) => {
              const isFriendMsg = msg.senderId === friendId;
              const isLastMsg = idx === 0;
              const isSenderSameInNextMsg =
                data.messages[idx + 1]?.senderId === msg.senderId;
              const isSenderSameInLastMsg =
                data.messages[idx - 1]?.senderId === msg.senderId;

              return (
                <Box
                  bgColor={isFriendMsg ? 'whiteAlpha.300' : 'green.500'}
                  p={2}
                  rounded='2xl'
                  alignSelf={isFriendMsg ? 'flex-start' : 'flex-end'}
                  maxW='60%'
                  ref={isLastMsg ? scrollToBottomRef : null}
                  key={msg.id}
                  mb={isSenderSameInLastMsg ? -2.5 : 0}
                >
                  <Text
                    key={msg.id}
                    color={isFriendMsg ? 'gray.100' : 'whiteAlpha.900'}
                    fontSize='sm'
                  >
                    {msg.text}
                  </Text>
                </Box>
              );
            })
          )}
        </Flex>
      </Box>
      <Box flex={1}>
        <MessageInput friendId={friendId} />
      </Box>
    </Grid>
  );
};
