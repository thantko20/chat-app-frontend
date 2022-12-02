import { Box, HStack, IconButton, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useGetContacts } from './api/useGetContacts';
import { BsChatDots } from 'react-icons/bs';

const ContactsList = () => {
  const { data, isLoading } = useGetContacts();
  return (
    <VStack alignItems='stretch'>
      {isLoading && 'Getting contacts'}
      {data &&
        data.map(({ toUser, id }) => (
          <HStack key={id}>
            <Box>{toUser.handleName}</Box>
            <IconButton
              as={RouterLink}
              icon={<BsChatDots />}
              aria-label={`chat with ${toUser.handleName}`}
              to={`/conversations/contacts/${toUser.id}`}
              state={{ contactUser: toUser }}
            />
          </HStack>
        ))}
    </VStack>
  );
};

export default ContactsList;
