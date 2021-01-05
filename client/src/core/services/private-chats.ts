import shortid from 'shortid';
import { DBCollections } from '../../core/constants/db';
import { firebaseServices } from '../firebase';
import { InterlocutorEntity, PrivateChatEntity } from '../../core/interfaces/chat';

export const createPrivateChatInDB = (
  interlocutors: InterlocutorEntity[],
) => {
  const chatId = shortid.generate();
  const privateChat: PrivateChatEntity = {
    interlocutors, id: chatId,
  };
  const link = firebaseServices.rdb
    .ref(`${DBCollections.PrivateChats}/${chatId}`)
    .set(privateChat);

  return {
    link,
    chatId,
  }
};

export const getPrivateChatByIdFromDB = (chatId: string) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.PrivateChats}/${chatId}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
};

export const getLinkOnPrivateChatInDB = (chatId: string) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.PrivateChats}/${chatId}`)
};

export const getAllPrivateChatsFromDB = () => {
  return firebaseServices.rdb
    .ref(DBCollections.PrivateChats)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
}
