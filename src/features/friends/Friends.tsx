import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FriendListContainer from './FriendListContainer';

const Friends = () => {
  return (
    <Tabs variant='solid-rounded' isFitted colorScheme='green'>
      <TabList>
        <Tab fontSize='sm'>Friends</Tab>
        <Tab fontSize='sm'>Search People</Tab>
        <Tab fontSize='sm'>Friend Requests</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FriendListContainer />
        </TabPanel>
        <TabPanel>Search Friends</TabPanel>
        <TabPanel>Friend Requests</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Friends;
