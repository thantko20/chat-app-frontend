import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useSocket } from '../../../lib/socket';
import { TSocketResponse } from '../../../types';

export const useSendMessage = (toUserId: string) => {
  const [text, setText] = useState('');
  const socket = useSocket();

  const onSend = (e: FormEvent) => {
    e.preventDefault();

    if (!text) return;
    const message = text;
    setText('');

    socket.emit(
      'send_message',
      { message, toUserId },
      (responseData: TSocketResponse) => {
        if (!responseData.status.ok) {
          toast.error('Could Not Send The Message.');
        }
      },
    );
  };

  return {
    text,
    setText,
    onSend,
  };
};
