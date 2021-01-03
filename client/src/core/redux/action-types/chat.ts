import { UserEntity } from '../reducers/auth';
import { ConversationEntity } from '../../interfaces/conversation';

export enum ChatActionTypes {
  UpdateCurrentUserChats = '[Chats] UpdateCurrentUserChats',
  UpdateCurrentUserConversations = '[Chats] UpdateCurrentUserConversations',
}

export interface UpdateCurrentUserChatsActionType {
  type: typeof ChatActionTypes.UpdateCurrentUserChats,
  payload: { chats: UserEntity[] },
}

export interface UpdateCurrentUserConversations {
  type: typeof ChatActionTypes.UpdateCurrentUserConversations,
  payload: { conversations: ConversationEntity[] },
}

export type ChatAction = UpdateCurrentUserChatsActionType | UpdateCurrentUserConversations;
