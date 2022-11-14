import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError(err) {
        toast.error((err as Error).message);
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError(err) {
        toast.error((err as Error).message);
      },
    },
  },
});

export default queryClient;
