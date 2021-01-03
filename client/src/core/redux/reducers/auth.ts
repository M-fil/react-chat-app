import { AuthAction, AuthActionTypes } from '../action-types/auth';

export interface UserEntity {
  email: string,
  avatar: string,
  uid: string,
  chats: UserEntity[],
}

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
      }
    default:
      return state;
  }
}