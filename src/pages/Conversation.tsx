import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Conversation } from '../features/conversations/Conversation';

const ConversationPage = () => {
  const { userId } = useParams();
  const {
    state: { contactUser },
  } = useLocation();

  return <Conversation userId={userId as string} contactUser={contactUser} />;
};

export default ConversationPage;
