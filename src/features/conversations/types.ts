import { IUser } from '../auth/types';

export interface IConversationCard {
  id: string;
  lastMessageId: string;
  lastMessage?: IMessage;
  participantIds: string[];
  participants: IUser[];
  updatedAt: Date;
  createdAt: Date;
}

export interface IMessage {
  id: string;
  senderId: string;
  conversationId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  cacheToken?: string | number;
  isSent?: boolean;
}

export interface IConversation {
  id: string;
  lastMessageId: string;
  participantIds: string[];
  participants: IUser[];
  messages: IMessage[];
  updatedAt: Date;
  createdAt: Date;
}
