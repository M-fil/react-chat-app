export enum AuthActionTypes {
  LoginInit = '[Auth] LoginInit',
  LoginSuccess = '[Auth] LoginSuccess',
  LoginFailed = '[Auth] LoginFailed',

  RegisterInit = '[Auth] RegisterInit',
  RegisterSuccess = '[Auth] RegisterSuccess',
  RegisterFailed = '[Auth] RegisterFailed',

  LogOut = '[Auth] LogOut',
}

export interface AuthInitActionType {
  type: typeof AuthActionTypes.LoginInit | typeof AuthActionTypes.RegisterInit,
}

export interface AuthSuccessActionType {
  type: typeof AuthActionTypes.LoginSuccess | typeof AuthActionTypes.RegisterSuccess,
  payload: { user: object },
}

export interface AuthFailedActionType {
  type: typeof AuthActionTypes.LoginFailed | typeof AuthActionTypes.RegisterFailed,
  payload: { errorMessage: string },
}

export interface LogOutActionType {
  type: typeof AuthActionTypes.LogOut,
}

export type AuthAction =
  AuthInitActionType
  | AuthSuccessActionType
  | AuthFailedActionType
  | LogOutActionType;


