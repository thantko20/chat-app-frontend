import { IUser } from '../auth/types';

export type TContactInfo = {
  id: string;
  fromUserId: string;
  toUserId: string;
  toUser: IUser;
};
