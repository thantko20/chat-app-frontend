import { Box } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import ConversationList from '../features/conversations/ConversationList';

const MainPage = () => {
  return (
    <Box>
      <ConversationList />
    </Box>
  );
};

export default MainPage;
