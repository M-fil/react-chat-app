import { ConversationEntity } from '../../interfaces/conversation';
import { MessageEntity, PrivateChatEntity } from '../../interfaces/chat';

export enum ChatActionTypes {
  UpdateCurrentUserChats = '[Chats] UpdateCurrentUserChats',
  UpdateCurrentUserConversations = '[Chats] UpdateCurrentUserConversations',
  UpdateCurrentUserPrivateChats = '[Chats] UpdateCurrentUserPrivateChats',
  UpdateCurrentMessages = '[Chat] UpdateCurrentMessages',
  SetCurrentChatId = '[Chat] SetCurrentChatId',
  SetCurrentMessages = '[Chat] SetCurrentMessages',
}

export interface UpdateCurrentUserChatsActionType {
  type: typeof ChatActionTypes.UpdateCurrentUserChats,
  payload: { chats: string[], setValue?: boolean },
}

export interface UpdateCurrentUserConversationsActionType {
  type: typeof ChatActionTypes.UpdateCurrentUserConversations,
  payload: { conversations: ConversationEntity[] },
}

export interface UpdateCurrentMessagesActionType {
  type: typeof ChatActionTypes.UpdateCurrentMessages,
  payload: { newMessage: MessageEntity },
}

export interface SetCurrentChatIdActionType {
  type: typeof ChatActionTypes.SetCurrentChatId,
  payload: { chatId: string },
}

export interface UpdateCurrentUserPrivateChatsActionType {
  type: typeof ChatActionTypes.UpdateCurrentUserPrivateChats,
  payload: { privateChats: PrivateChatEntity[] },
}

export interface SetCurrentMessagesActionType {
  type: ChatActionTypes.SetCurrentMessages,
  payload: { messages: MessageEntity[] },
}

export type ChatAction =
  UpdateCurrentUserChatsActionType
  | UpdateCurrentUserConversationsActionType
  | UpdateCurrentUserPrivateChatsActionType
  | UpdateCurrentMessagesActionType
  | SetCurrentChatIdActionType
  | SetCurrentMessagesActionType;
