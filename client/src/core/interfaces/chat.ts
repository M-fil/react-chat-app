export type ChatType = 'private-chat' | 'conversation';

export interface InterlocutorEntity {
  uid: string,
  email: string,
  avatar: string,
}

export interface PrivateChatEntity {
  interlocutors: InterlocutorEntity[],
  id: string,
}

export interface FromUserEntity {
  email: string,
  avatar: string,
  uid: string,
}

export interface MessageEntity {
  id: string,
  text: string,
  from?: FromUserEntity,
  createdAt: Date,
  isNotification?: boolean,
}
