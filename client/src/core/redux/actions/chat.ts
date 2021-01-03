import { ChatAction, ChatActionTypes } from '../action-types/chat';
import { UserEntity } from '../reducers/auth';
import { ConversationEntity } from '../../interfaces/conversation';

export const updateCurrentUserChatsAction = (chats: UserEntity[]): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserChats,
  payload: { chats },
});

export const updateCurrentUserConversationsAction = (conversations: ConversationEntity[]): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserConversations,
  payload: { conversations },
})
