import { IUser } from '../auth/types';

export interface IFriendship {
  id: string;
  friendOfId: string;
  friendToId?: string;
  friendOf: IUser;
  friendTo?: IUser | null;
  status: string;
}
