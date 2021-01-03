import { UserEntity } from '../reducers/auth';
import { ChatAction, ChatActionTypes } from '../action-types/chat';

export interface State {
  chats: UserEntity[],
}

const initialState: State = {
  chats: [],
}

export const chatsReducer = (state: State = initialState, action: ChatAction): State => {
  switch(action.type) {
    case ChatActionTypes.UpdateCurrentUserChats:
      return {
        chats: action.payload.chats,
      }
    default:
      return state;
  }
};