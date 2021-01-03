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
