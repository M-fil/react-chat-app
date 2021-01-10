import { createSelector } from 'reselect';

import { InterlocutorEntity, PrivateChatEntity } from '../interfaces/chat';
import { ConversationEntity } from '../interfaces/conversation';
import { AppState } from '../redux/reducers';
import { State } from '../redux/reducers/chat';
import { selectUserUid } from './auth';

const selectChatsState = (state: AppState): State => state.chat;

export interface PrivateChatWithCurrentUserEntity {
  user: InterlocutorEntity | undefined,
  id: string,
}

export const selectChats = createSelector(
  selectChatsState,
  (state: State) => state.chats || [],
);

export const selectConversations = createSelector(
  selectChatsState,
  (state: State) => state.conversations || [],
);

export const selectPrivateChats = createSelector(
  selectChatsState,
  (state: State) => state.privateChats || [],
);

export const selectPrivateChatsWithCurrentUser = createSelector(
  selectPrivateChats,
  selectUserUid,
  (
    privateChats: PrivateChatEntity[], uid: string,
  ): PrivateChatWithCurrentUserEntity[] => privateChats.map((chat) => ({
    user: chat.interlocutors?.find((interlocutor) => interlocutor.uid === uid),
    id: chat.id,
  }))
);

export const selectCurrentMessages = createSelector(
  selectChatsState,
  (state: State) => state.currentMessages || [],
);

export const selectCurrentChatId = createSelector(
  selectChatsState,
  (state: State) => state.currentChatId,
);

export const selectInterlocutorId = createSelector(
  selectPrivateChats,
  selectCurrentChatId,
  selectUserUid,
  (
    privateChats: PrivateChatEntity[], chatId: string, userUid: string,
  ): string => {
    const currentChat = privateChats.find((chat) => chat.id === chatId);
    if (currentChat) {
      const interlocutor = currentChat.interlocutors
        .find((interlocutor) => interlocutor.uid !== userUid);
      return interlocutor?.uid || '';
    }

    return '';
  }
);

export const selectUsersFromCurrentChats = createSelector(
  selectPrivateChats,
  selectUserUid,
  (
    privateChats: PrivateChatEntity[], userUid: string,
  ): string[] => privateChats
    .map((chat) => {
      const interlocutor = chat.interlocutors.find((interlocutor) => interlocutor.uid !== userUid);
      return interlocutor?.uid || '';
    })
);

export const selectChatByCurrentChatId = createSelector(
  selectPrivateChats,
  selectConversations,
  selectCurrentChatId,
  (
    privateChats: PrivateChatEntity[],
    conversations: ConversationEntity[],
    chatId: string,
  ): PrivateChatEntity | ConversationEntity | undefined => {
    const targetChat = privateChats.find((chat) => chat.id === chatId);
    const targetConversation = conversations.find((conversation) => conversation.id === chatId);

    return targetChat || targetConversation;
  }
);
