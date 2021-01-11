export type ChatType = 'private-chat' | 'conversation';
export type MessagePositionType = 'right' | 'left';

export interface InterlocutorEntity {
  uid: string,
  email: string,
  avatar: string,
}

export interface PrivateChatEntity {
  interlocutors: InterlocutorEntity[],
  id: string,
  lastMessage?: string,
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
