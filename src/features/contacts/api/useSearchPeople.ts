import { useState, useRef, useEffect } from 'react';
import { useSocket } from '../../../lib/socket';
import { TSearchedUser } from '../types';

export const useSearchPeople = () => {
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
    }, 0);

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

  return { people, setInputValue: setValue };
};
