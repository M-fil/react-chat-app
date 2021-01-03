import { UserEntity } from '../reducers/auth';
import { ChatAction, ChatActionTypes } from '../action-types/chat';
import { ConversationEntity } from '../../interfaces/conversation';

export interface State {
  chats: UserEntity[],
  conversations: ConversationEntity[],
}

const initialState: State = {
  chats: [],
  conversations: [],
}

export const chatsReducer = (state: State = initialState, action: ChatAction): State => {
  switch(action.type) {
    case ChatActionTypes.UpdateCurrentUserChats:
      return {
        ...state,
        chats: action.payload.chats,
      };
    case ChatActionTypes.UpdateCurrentUserConversations:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    default:
      return state;
  }
};