import { firebaseServices } from '../firebase';
import { DBCollections } from '../constants/db';
import { UserEntity } from '../redux/reducers/auth';
import { MessageEntity } from '../interfaces/chat';

export const updateChatsOfUser = (userId: string, newChats: UserEntity[]) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Users}/${userId}`)
    .update({ chats: newChats });
}

export const createNewMessageForChat = (userId: string, message: MessageEntity) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Messages}/${userId}`)
    .push(message)
};

export const getRefOnChatMessages = (userId: string) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Messages}/${userId}`)
};

export const getAllMessagesFromChat = (userId: string) => {
  return getRefOnChatMessages(userId)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
}

