import { IUser } from '../auth/types';

export interface IConversation {
  id: string;
  lastMessageId: string;
  participantIds: string[];
  participants: IUser[];
  updatedAt: Date;
  createdAt: Date;
}
