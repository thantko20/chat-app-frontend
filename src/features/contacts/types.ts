import { TSucessResponseDataType } from '../../types';
import { IUser } from '../auth/types';

export type TContact = {
  id: string;
  fromUserId: string;
  toUserId: string;
  toUser: IUser;
};

export type TSearchedUser = IUser & {
  isInReqUserContacts: boolean;
};

export type TDataContact = TSucessResponseDataType<TContact, 'contact'>;

export type TDataContacts = TSucessResponseDataType<TContact[], 'contacts'>;

export type TDataSearchUser = TSucessResponseDataType<
  TSearchedUser,
  'contacts'
>;
