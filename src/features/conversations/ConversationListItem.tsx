import { Heading, Box, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { IUser } from '../auth/types';
import { IConversationCard } from './types';

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
        bgColor: 'white',
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

export default ConversationListItem;
