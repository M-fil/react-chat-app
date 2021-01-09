import { AuthAction, AuthActionTypes } from '../action-types/auth';
import { UserEntity } from '../../interfaces/user';

export interface State {
  isLoading: boolean,
  errorMessage: string,
  user: UserEntity,
}

const initialState: State = {
  isLoading: false,
  errorMessage: '',
  user: {
    email: '',
    avatar: '',
    uid: '',
    chats: [],
    conversations: [],
  },
};

export const authReducer = (state: State = initialState, action: AuthAction): State => {
  switch(action.type) {
    case AuthActionTypes.LoginInit:
    case AuthActionTypes.RegisterInit:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case AuthActionTypes.LoginFailed:
    case AuthActionTypes.RegisterFailed:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.RegisterSuccess:
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        user: action.payload.user as UserEntity,
      };
    case AuthActionTypes.LogOut:
      return {
        ...initialState,
      };
    case AuthActionTypes.UpdateUserConversationIds:
      return {
        ...state,
        user: {
          ...state.user,
          conversations: action.payload.setValue
            ? action.payload.conversationIds
            : [...(state.user.conversations || []), ...action.payload.conversationIds],
        }
      };
    case AuthActionTypes.UpdateUserPrivateChatsIds:
      return {
        ...state,
        user: {
          ...state.user,
          chats: action.payload.setValue
            ? action.payload.privateChatIds
            : [...(state.user.chats || []), ...action.payload.privateChatIds],
        }
      }
    default:
      return state;
  }
}
