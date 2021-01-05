import { ChatAction, ChatActionTypes } from '../action-types/chat';
import { ConversationEntity } from '../../interfaces/conversation';
import { MessageEntity, PrivateChatEntity } from '../../interfaces/chat';

export interface State {
  chats: string[],
  conversations: ConversationEntity[],
  privateChats: PrivateChatEntity[],
  currentMessages: MessageEntity[],
  currentChatId: string,
}

const initialState: State = {
  chats: [],
  conversations: [],
  privateChats: [],
  currentMessages: [],
  currentChatId: '',
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
    case ChatActionTypes.UpdateCurrentMessages:
      return {
        ...state,
        currentMessages: action.payload.messages,
      };
    case ChatActionTypes.SetCurrentChatId:
      return {
        ...state,
        currentChatId: action.payload.chatId,
      };
    case ChatActionTypes.UpdateCurrentUserPrivateChats:
      return {
        ...state,
        privateChats: action.payload.privateChats,
      };
    default:
      return state;
  }
};