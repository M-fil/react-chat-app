import { ChatAction, ChatActionTypes } from '../action-types/chat';
import { ConversationEntity } from '../../interfaces/conversation';
import { MessageEntity, PrivateChatEntity } from '../../interfaces/chat';

export const updateCurrentUserChatsAction = (chats: string[], setValue: boolean = true): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserChats,
  payload: { chats, setValue },
});

export const updateCurrentUserConversationsAction = (conversations: ConversationEntity[]): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserConversations,
  payload: { conversations },
});

export const updateCurrentUserPrivateChats = (privateChats: PrivateChatEntity[]): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserPrivateChats,
  payload: { privateChats },
});

export const updateCurrentMessagesAction = (newMessage: MessageEntity): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentMessages,
  payload: { newMessage },
});

export const setCurrentChatIdAction = (chatId: string): ChatAction => ({
  type: ChatActionTypes.SetCurrentChatId,
  payload: { chatId },
})

export const setCurrentMessagesAction = (messages: MessageEntity[]): ChatAction => ({
  type: ChatActionTypes.SetCurrentMessages,
  payload: { messages }
});
