import { Box, HStack, Input } from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSocket } from '../../lib/socket';
import { TSearchedUser } from './type';

const SearchPeople = () => {
  const [value, setValue] = useState('');
  const [people, setPeople] = useState<TSearchedUser[]>([]);
  const socket = useSocket();
  const searchTimeoutRef = useRef<number | undefined | null>(null);

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
                  {person.isInReqUserContacts
                    ? 'Already in the contacts'
                    : 'Add to contact'}
                </Box>
              </HStack>
            );
          })}
      </Box>
    </div>
  );
};

export default SearchPeople;
