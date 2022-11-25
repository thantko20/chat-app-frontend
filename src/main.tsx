import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './features/auth/AuthProvider';
import { SocketProvider } from './lib/socket';
import './index.css';
import queryClient from './lib/react-query';
import router from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </SocketProvider>
      </AuthProvider>
    </ChakraProvider>

    <Toaster position='top-center' />
  </React.StrictMode>,
);
