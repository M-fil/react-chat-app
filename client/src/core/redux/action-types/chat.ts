import { UserEntity } from "../reducers/auth";

export enum ChatActionTypes {
  UpdateCurrentUserChats = '[Chats] UpdateCurrentUserChats',
}

export interface UpdateCurrentUserChatsActionType {
  type: typeof ChatActionTypes.UpdateCurrentUserChats,
  payload: { chats: UserEntity[] },
}

export type ChatAction = UpdateCurrentUserChatsActionType;
