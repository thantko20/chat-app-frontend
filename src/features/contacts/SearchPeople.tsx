import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BsChatDots } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import { useSocket } from '../../lib/socket';
import { useAddContact } from './api/useAddContact';
import { TContactInfo, TSearchedUser } from './types';
import { Link as RouterLink } from 'react-router-dom';

const SearchPeople = () => {
  const [value, setValue] = useState('');
  const [people, setPeople] = useState<TSearchedUser[]>([]);
  const socket = useSocket();
  const searchTimeoutRef = useRef<number | undefined | null>(null);
  const mutation = useAddContact();
  const queryClient = useQueryClient();

  // Synchronizing socket.emit when value changes
  // timeout for delaying search on input change
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      socket.emit('find_users', { handleName: value });
    }, 200);

    return () => {
      clearTimeout(searchTimeoutRef.current as number);
    };
  }, [value]);

  useEffect(() => {
    const receiveUsers = ({ users }: { users: TSearchedUser[] }) => {
      if (!value) {
        setPeople([]);
        return;
      }
      setPeople(users);
    };
    socket.on('find_users', receiveUsers);

    return () => {
      socket.off('find_users', receiveUsers);
    };
  }, [value]);

  const addToContact = (userId: string) => {
    mutation.mutate(userId, {
      onSuccess(data) {
        toast.success('Contact Added.');
        queryClient.setQueryData(
          ['contacts'],
          (oldData: TContactInfo[] | undefined) => {
            if (!oldData) {
              return [data];
            }
            return [...oldData, data];
          },
        );
        setPeople((prev) => {
          if (!prev) {
            return [];
          }

          const tempPeople = people.map((person) => {
            if (person.id === userId) {
              return { ...person, isInReqUserContacts: true };
            }
            return person;
          });

          return tempPeople;
        });
      },
    });
  };

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <VStack alignItems='stretch' mt={4} divider={<StackDivider />}>
        {people &&
          people.map((person) => {
            return (
              <HStack key={person.id} justifyContent='space-between'>
                <Box>
                  <Box fontWeight='semibold'>{`${person.firstName} ${person.lastName}`}</Box>
                  <Box fontSize='sm' color='gray.600'>
                    @{person.handleName}
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    as={RouterLink}
                    icon={<BsChatDots />}
                    aria-label={`chat with ${person.handleName}`}
                    to={`/conversations/contacts/${person.id}`}
                    state={{ contactUser: person }}
                    variant='solid'
                    colorScheme='green'
                    rounded='full'
                    size='sm'
                  />
                  {!person.isInReqUserContacts && (
                    <IconButton
                      icon={<IoMdPersonAdd />}
                      aria-label='add to contact'
                      onClick={() => addToContact(person.id)}
                      rounded='full'
                      colorScheme='yellow'
                      size='sm'
                      variant='solid'
                      ml={2}
                    />
                  )}
                </Box>
              </HStack>
            );
          })}
      </VStack>
    </div>
  );
};

export default SearchPeople;
