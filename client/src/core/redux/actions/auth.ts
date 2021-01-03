import { AuthAction, AuthActionTypes } from '../action-types/auth';
import { UserEntity } from '../reducers/auth';

export const loginInitAction = (): AuthAction => ({
  type: AuthActionTypes.LoginInit,
});

export const loginFailedAction = (errorMessage: string): AuthAction => ({
  type: AuthActionTypes.LoginFailed,
  payload: { errorMessage },
});

export const loginSuccessAction = (user: UserEntity): AuthAction => ({
  type: AuthActionTypes.LoginSuccess,
  payload: { user },
});

export const registerInitAction = (): AuthAction => ({
  type: AuthActionTypes.RegisterInit,
});

export const registerFailedAction = (errorMessage: string): AuthAction => ({
  type: AuthActionTypes.RegisterFailed,
  payload: { errorMessage },
});

export const registerSuccessAction = (user: UserEntity): AuthAction => ({
  type: AuthActionTypes.RegisterSuccess,
  payload: { user },
});

export const logOutAction = (): AuthAction => ({
  type: AuthActionTypes.LogOut,
});
