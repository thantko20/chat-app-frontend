import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useGetFriends } from './api/useGetFriends';

const FriendListContainer = () => {
  const { data, isLoading } = useGetFriends();
  const navigate = useNavigate();
  return (
    <VStack alignItems='stretch' gap={4}>
      {isLoading && (
        <>
          <Skeleton h={10} w='full' />
          <Skeleton h={10} w='full' />
          <Skeleton h={10} w='full' />
        </>
      )}

      {data && (
        <>
          {data.map(({ friendTo, ...friendship }) => (
            <>
              <Flex
                key={friendship.id}
                justifyContent='space-between'
                bgColor='gray.100'
                p={2}
                rounded='base'
                alignItems='center'
              >
                <VStack alignItems='flex-start'>
                  <Heading as='h3' fontSize='xl'>
                    {friendTo?.firstName + ' ' + friendTo?.lastName}
                  </Heading>
                  <Text>@{friendTo?.handleName}</Text>
                </VStack>
                <IconButton
                  icon={<BiMessageSquareEdit />}
                  aria-label='go to the conversation'
                  onClick={() =>
                    navigate(`/conversations/friend/${friendTo?.id}`, {
                      state: {
                        friend: friendTo,
                      },
                    })
                  }
                  variant='solid'
                  colorScheme='green'
                  rounded='full'
                  size='sm'
                />
              </Flex>
            </>
          ))}
        </>
      )}
    </VStack>
  );
};

export default FriendListContainer;
