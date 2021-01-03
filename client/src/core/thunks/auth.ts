import { Dispatch } from 'redux';

import {
  loginInitAction,
  loginFailedAction,
  loginSuccessAction,

  registerInitAction,
  registerFailedAction,
  registerSuccessAction,

  logOutAction,
} from '../redux/actions/auth';
import * as AuthService from '../services/auth';
import { UserEntity } from '../redux/reducers/auth';
import * as UserServices from '../services/users';

export const loginThunk = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(loginInitAction());
    AuthService.loginUser(email, password)
      .then((data) => {
        const authedUser: UserEntity = {
          email: data.user?.email || '',
          avatar: '',
          uid: data.user?.uid || '',
          chats: [],
        };
        dispatch(loginSuccessAction(authedUser));
      })
      .catch((error: Error) => {
        dispatch(loginFailedAction(error.message));
      });
  };
};

export const registerThunk = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(registerInitAction());
    AuthService.registerUser(email, password)
      .then((data) => {
        const authedUser: UserEntity = {
          email: data.user?.email || '',
          avatar: '',
          uid: data.user?.uid || '',
          chats: [],
        };
        UserServices.createNewUserInDB(authedUser);
        dispatch(registerSuccessAction(authedUser));
        loginThunk(email, password)(dispatch);
      })
      .catch((error: Error) => {
        dispatch(registerFailedAction(error.message));
      });
  };
}

export const logOutThunk = () => {
  return (dispatch: Dispatch) => {
    AuthService.logOutUser()
      .then(() => {
        dispatch(logOutAction());
      });
  }
};
