import { useMutation } from '@tanstack/react-query';
import axios from '../../../lib/axios';
import { IFriendship } from '../type';

const addFriend = (friendId: string): Promise<IFriendship> => {
  return axios.post(`friends/add/${friendId}`);
};

export const useAddFriend = () => {
  return useMutation(addFriend);
};
