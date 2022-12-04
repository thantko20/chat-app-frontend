import { Box, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <Grid templateRows='min-content 1fr' h='100vh'>
      <Box as={Header}></Box>
      <Box maxW='xl' mx='auto' py={2} w='full'>
        <Outlet />
      </Box>
    </Grid>
  );
};

export default App;
