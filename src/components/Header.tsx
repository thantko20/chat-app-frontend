import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { IoIosSettings } from 'react-icons/io';
import { AiFillWechat } from 'react-icons/ai';
import { useLogout } from '../features/auth/api/useLogout';
import { useAuth } from '../features/auth/AuthProvider';
import ConfirmationDialog from './ConfirmationDialog';

const SettingsMenu = () => {
  const logout = useLogout();
  const { user } = useAuth();
  return (
    <Menu placement='bottom-end'>
      <MenuButton
        as={IconButton}
        icon={<IoIosSettings />}
        size='sm'
        rounded='full'
      />
      <MenuList>
        <MenuItem>{`${user?.firstName} ${user?.lastName}`}</MenuItem>
        <MenuItem as='div'>
          <ConfirmationDialog
            triggerButton={
              <Button
                variant='unstyled'
                colorScheme='red'
                rightIcon={<FiLogOut />}
              >
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
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header = () => {
  const { user } = useAuth();

  return (
    <header>
      <HStack maxW='xl' mx='auto' px='2' py='4' justifyContent='space-between'>
        <Box color='green.400' fontSize='2xl' fontWeight='semibold'>
          <Box as='span' lineHeight={1}>
            Chat
          </Box>{' '}
          <Icon as={AiFillWechat} ml={1} />
        </Box>
        <HStack as='nav'>
          {user ? (
            <HStack>
              <IconButton
                aria-label='conversations'
                icon={<BsFillChatDotsFill />}
                to='/'
                as={RouterLink}
                size='sm'
                rounded='full'
              />
              <IconButton
                as={RouterLink}
                aria-label='contacts'
                icon={<FaUserFriends />}
                to='/contacts'
                rounded='full'
                size='sm'
              />
              <SettingsMenu />
            </HStack>
          ) : (
            <HStack gap={2}>
              <Button
                as={RouterLink}
                variant='ghost'
                colorScheme='green'
                to='/auth/login'
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                variant='outline'
                colorScheme='green'
                to='/auth/register'
              >
                Register
              </Button>
            </HStack>
          )}
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
