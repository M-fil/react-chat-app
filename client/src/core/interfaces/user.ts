export interface UserEntity {
  email: string,
  avatar: string,
  uid: string,
  chats?: string[],
  conversations?: string[],
}
