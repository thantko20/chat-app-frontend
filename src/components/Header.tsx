import { Box, Button, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../features/auth/api/useLogout';
import { useAuth } from '../features/auth/AuthProvider';
import ConfirmationDialog from './ConfirmationDialog';

const Header = () => {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <header>
      <HStack maxW='xl' mx='auto' px='2' py='4' justifyContent='space-between'>
        <Box color='green.400' fontSize='2xl' fontWeight='semibold'>
          Logo
        </Box>
        <HStack as='nav'>
          {user && (
            <HStack as='ul' listStyleType='none'>
              <li>
                <Link to='/' as={RouterLink} colorScheme='green'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/friends' as={RouterLink} colorScheme='green'>
                  Friends
                </Link>
              </li>
            </HStack>
          )}
          <HStack gap={4}>
            {user ? (
              <>
                <ConfirmationDialog
                  triggerButton={
                    <Button variant='ghost' colorScheme='red'>
                      Logout
                    </Button>
                  }
                  confirmButton={
                    <Button onClick={logout} colorScheme='red'>
                      Logout
                    </Button>
                  }
                  title='Are you sure to logout?'
                  body='This action cannot be undone.'
                />
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/auth/login')}
                  variant='ghost'
                  colorScheme='green'
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/auth/register')}
                  variant='outline'
                  colorScheme='green'
                >
                  Register
                </Button>
              </>
            )}
          </HStack>
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
