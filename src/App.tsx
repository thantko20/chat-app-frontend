import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Box maxW='xl' mx='auto' py={2} px={2}>
        <Outlet />
      </Box>
    </div>
  );
};

export default App;
