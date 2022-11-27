import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Conversation } from '../features/conversations/Conversation';

const ConversationPage = () => {
  const { friendId } = useParams();
  const {
    state: { friend },
  } = useLocation();

  return <Conversation friendId={friendId as string} friend={friend} />;
};

export default ConversationPage;
