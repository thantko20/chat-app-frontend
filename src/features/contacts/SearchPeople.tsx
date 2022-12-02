import { Box, Button, HStack, Input } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSocket } from '../../lib/socket';
import { useAddContact } from './api/useAddContact';
import { TContactInfo, TSearchedUser } from './types';

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
      <Box>
        {people &&
          people.map((person) => {
            return (
              <HStack key={person.id}>
                <Box>{person.handleName}</Box>
                <Box>
                  {person.isInReqUserContacts ? (
                    'Already in the contacts'
                  ) : (
                    <Button onClick={() => addToContact(person.id)}>
                      Add To Contact
                    </Button>
                  )}
                </Box>
              </HStack>
            );
          })}
      </Box>
    </div>
  );
};

export default SearchPeople;
