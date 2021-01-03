import { ChatAction, ChatActionTypes } from '../action-types/chat';
import { UserEntity } from '../reducers/auth';

export const updateCurrentUserChatsAction = (chats: UserEntity[]): ChatAction => ({
  type: ChatActionTypes.UpdateCurrentUserChats,
  payload: { chats },
});
