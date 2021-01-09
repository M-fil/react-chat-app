export enum AuthActionTypes {
  LoginInit = '[Auth] LoginInit',
  LoginSuccess = '[Auth] LoginSuccess',
  LoginFailed = '[Auth] LoginFailed',

  RegisterInit = '[Auth] RegisterInit',
  RegisterSuccess = '[Auth] RegisterSuccess',
  RegisterFailed = '[Auth] RegisterFailed',

  LogOut = '[Auth] LogOut',
  UpdateUserConversationIds = '[Auth] UpdateUserConversationIds',
  UpdateUserPrivateChatsIds = '[Auth] UpdateUserPrivateChatsIds',
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

export interface UpdateUserPrivateChatsIdsActionType {
  type: typeof AuthActionTypes.UpdateUserPrivateChatsIds,
  payload: { privateChatIds: string[], setValue?: boolean },
}

export interface UpdateUserConversationIdsActionType {
  type: typeof AuthActionTypes.UpdateUserConversationIds,
  payload: { conversationIds: string[], setValue?: boolean },
}


export type AuthAction =
  AuthInitActionType
  | AuthSuccessActionType
  | AuthFailedActionType
  | LogOutActionType
  | UpdateUserConversationIdsActionType
  | UpdateUserPrivateChatsIdsActionType;
