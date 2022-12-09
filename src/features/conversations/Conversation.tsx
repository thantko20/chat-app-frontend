import {
  Box,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  LegacyRef,
  useEffect,
  useState,
} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { useSocket } from '../../lib/socket';
import { IUser } from '../auth/types';
import { useGetFriendConversation } from './api/getConversationWithUser';
import toast from 'react-hot-toast';
import { IoIosArrowBack } from 'react-icons/io';
import { useScrollTo } from '../../hooks/useScrollTo';
import { useSendMessage } from './api/sendMessage';
import { IMessage } from './types';

const MessageInput = ({ friendId }: { friendId: string }) => {
  const { text, setText, onSend } = useSendMessage(friendId);

  return (
    <Flex
      as='form'
      onSubmit={onSend}
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

type MessageProps = {
  isLastMsg: boolean;
  isFriendMsg: boolean;
  isSenderSameInNextMsg: boolean;
  isSenderSameInLastMsg: boolean;
  message: IMessage;
};

const Message = forwardRef(
  (props: MessageProps, ref: LegacyRef<HTMLDivElement>) => {
    const {
      isLastMsg,
      isFriendMsg,
      isSenderSameInLastMsg,
      isSenderSameInNextMsg,
      message,
    } = props;
    return (
      <Box
        bgColor={isFriendMsg ? 'whiteAlpha.300' : 'green.500'}
        p={2}
        rounded='2xl'
        alignSelf={isFriendMsg ? 'flex-start' : 'flex-end'}
        maxW='60%'
        ref={ref}
        key={message.id}
        mb={isSenderSameInLastMsg ? -2 : 0}
      >
        <Text
          key={message.id}
          color={isFriendMsg ? 'gray.100' : 'whiteAlpha.900'}
          fontSize='sm'
        >
          {message.text}
        </Text>
      </Box>
    );
  },
);

export type ConversationProps = {
  userId: string;
  contactUser: IUser;
};

export const Conversation = ({
  userId: friendId,
  contactUser: friend,
}: ConversationProps) => {
  const { data, isLoading } = useGetFriendConversation(friend.id);
  const [animationParent] = useAutoAnimate();
  const navigate = useNavigate();
  const { ref, scrollTo } = useScrollTo<HTMLDivElement>();

  useEffect(() => {
    const scrollToBottom = () => {
      scrollTo({
        behavior: 'smooth',
        block: 'nearest',
      });
    };
    scrollToBottom();
  }, [data?.conversation.messages]);

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
          ) : !data?.conversation ? (
            <Text textAlign='center'>Start a conversation.</Text>
          ) : (
            data?.conversation.messages.map((msg, idx) => {
              const isFriendMsg = msg.senderId === friendId;
              const isLastMsg = idx === 0;
              const isSenderSameInNextMsg =
                data.conversation.messages[idx + 1]?.senderId === msg.senderId;
              const isSenderSameInLastMsg =
                data.conversation.messages[idx - 1]?.senderId === msg.senderId;

              return (
                <Message
                  isFriendMsg={isFriendMsg}
                  isLastMsg={isLastMsg}
                  isSenderSameInLastMsg={isSenderSameInLastMsg}
                  isSenderSameInNextMsg={isSenderSameInNextMsg}
                  message={msg}
                  ref={isLastMsg ? ref : null}
                />
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
