import { ReactNode } from 'react';
import { VStack, Box, Heading } from '@chakra-ui/react';

export type FormProps = {
  title?: string;
  children?: ReactNode;
  onSubmit: () => {};
};

export const Form = ({ onSubmit, title = '', children }: FormProps) => {
  return (
    <Box>
      <Heading as='h2' fontSize='2xl' fontWeight='semibold'>
        {title}
      </Heading>
      <VStack as='form' onSubmit={onSubmit} gap={4} mt={8} alignItems='stretch'>
        {children}
      </VStack>
    </Box>
  );
};
