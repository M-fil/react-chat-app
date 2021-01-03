import { MessageEntity, FromUserEntity } from './chat';

export interface ConversationEntity {
  id: string,
  name: string;
  admin: FromUserEntity,
  messages: MessageEntity[],
}
