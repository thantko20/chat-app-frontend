import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import ContactsList from '../features/contacts/ContactsList';

const Contacts = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Contacts</Tab>
        <Tab>Search People</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ContactsList />
        </TabPanel>
        <TabPanel>Search me daddy.</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Contacts;
