import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { IFriendship } from '../type';

const getFriends = (): Promise<IFriendship[]> => {
  return axios.get('/friends');
};

export const useGetFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  });
};
