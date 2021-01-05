import { ChatAction, ChatActionTypes } from '../action-types/chat';
import { ConversationEntity } from '../../interfaces/conversation';
import { MessageEntity, PrivateChatEntity } from '../../interfaces/chat';

export const updateCurrentUserChatsAction = (chats: string[]): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserChats,
  payload: { chats },
});

export const updateCurrentUserConversationsAction = (conversations: ConversationEntity[]): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserConversations,
  payload: { conversations },
});

export const updateCurrentUserPrivateChats = (privateChats: PrivateChatEntity[]) => ({
  type: ChatActionTypes.UpdateCurrentUserPrivateChats,
  payload: { privateChats },
});

export const updateCurrentMessagesAction = (messages: MessageEntity[]) => ({
  type: ChatActionTypes.UpdateCurrentMessages,
  payload: { messages },
});

export const setCurrentChatIdAction = (chatId: string) => ({
  type: ChatActionTypes.SetCurrentChatId,
  payload: { chatId },
})
