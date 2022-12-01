import { Box } from '@chakra-ui/react';
import React from 'react';
import { useGetContacts } from './api/useGetContacts';

const ContactsList = () => {
  const { data, isLoading } = useGetContacts();
  return (
    <div>
      {isLoading && 'Getting contacts'}
      {data &&
        data.map(({ toUser, id }) => <Box key={id}>{toUser.handleName}</Box>)}
    </div>
  );
};

export default ContactsList;
