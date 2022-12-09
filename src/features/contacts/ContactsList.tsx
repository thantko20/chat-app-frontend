import {
  Box,
  Button,
  HStack,
  IconButton,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useGetContacts } from './api/useGetContacts';
import { BsChatDots } from 'react-icons/bs';
import { useRemoveContact } from './api/removeContact';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { TContact } from './types';
import { IoMdRemoveCircle } from 'react-icons/io';

const ContactsList = () => {
  const { data, isLoading } = useGetContacts();
  const removeContactMutation = useRemoveContact();
  const queryClient = useQueryClient();

  const removeContact = (contactId: string) => {
    removeContactMutation.mutate(contactId, {
      onSuccess(contacts) {
        toast.success('Contact Removed');
        queryClient.setQueryData(['contacts'], contacts);
      },
    });
  };

  return (
    <VStack alignItems='stretch' divider={<StackDivider />}>
      {isLoading && 'Getting contacts'}
      {data?.contacts &&
        data.contacts.map(({ toUser, id }) => (
          <HStack key={id} justifyContent='space-between'>
            <Box>
              <Box fontWeight='semibold'>{`${toUser.firstName} ${toUser.lastName}`}</Box>
              <Box fontSize='sm' color='gray.600'>
                @{toUser.handleName}
              </Box>
            </Box>
            <HStack>
              <ConfirmationDialog
                triggerButton={
                  <IconButton
                    icon={<IoMdRemoveCircle />}
                    aria-label='remove contact'
                    rounded='full'
                    colorScheme='red'
                    size='sm'
                  />
                }
                confirmButton={
                  <Button
                    onClick={() => removeContact(id)}
                    colorScheme='red'
                    isLoading={removeContactMutation.isLoading}
                  >
                    Remove
                  </Button>
                }
                title='Remove Contact'
                body={`Remove '${toUser.firstName} ${toUser.lastName}' from contacts?`}
              />
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
          </HStack>
        ))}
    </VStack>
  );
};

export default ContactsList;
