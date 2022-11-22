import { useEffect } from 'react';
import { Input } from '../../components/Input';
import { useSocket } from '../../lib/socket';
import { useGetFriendConversation } from './api/useGetFriendConversation';

export const Conversation = ({ friendId }: { friendId: string }) => {
  const { data, isLoading } = useGetFriendConversation(friendId);
  const socket = useSocket();

  return (
    <div>
      {isLoading && <p>Loading messages</p>}
      {data &&
        data.messages.map((msg) => {
          return (
            <div>
              <p>{msg.text}</p>
            </div>
          );
        })}
      {!data && <p>Send a message</p>}
      <Input type='text' />
    </div>
  );
};
