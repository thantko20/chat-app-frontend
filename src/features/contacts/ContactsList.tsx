import {
  Box,
  HStack,
  IconButton,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useGetContacts } from './api/useGetContacts';
import { BsChatDots } from 'react-icons/bs';

const ContactsList = () => {
  const { data, isLoading } = useGetContacts();
  return (
    <VStack alignItems='stretch' divider={<StackDivider />}>
      {isLoading && 'Getting contacts'}
      {data &&
        data.map(({ toUser, id }) => (
          <HStack key={id} justifyContent='space-between'>
            <Box>
              <Box fontWeight='semibold'>{`${toUser.firstName} ${toUser.lastName}`}</Box>
              <Box fontSize='sm' color='gray.600'>
                @{toUser.handleName}
              </Box>
            </Box>
            <IconButton
              as={RouterLink}
              icon={<BsChatDots />}
              aria-label={`chat with ${toUser.handleName}`}
              to={`/conversations/contacts/${toUser.id}`}
              state={{ contactUser: toUser }}
              variant='solid'
              colorScheme='green'
              rounded='full'
              size='sm'
            />
          </HStack>
        ))}
    </VStack>
  );
};

export default ContactsList;
