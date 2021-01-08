import { FromUserEntity, InterlocutorEntity } from './chat';

export interface ConversationEntity {
  id: string,
  name: string;
  admin: FromUserEntity,
  interlocutors: InterlocutorEntity[],
}
