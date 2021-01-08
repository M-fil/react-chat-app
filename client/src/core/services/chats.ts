import shortid from 'shortid';

import { firebaseServices } from '../firebase';
import { DBCollections } from '../constants/db';
import { MessageEntity } from '../interfaces/chat';
import { socket } from '../../App';
import { SocketEvents } from '../constants/events';

export const updateChatsOfUser = (userId: string, newChats: string[]) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Users}/${userId}`)
    .update({ chats: newChats });
}

export const createNewMessageForChat = (chatId: string, message: MessageEntity) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Messages}/${chatId}`)
    .push(message)
};

export const getRefOnChatMessages = (chatId: string) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Messages}/${chatId}`)
};

export const getAllMessagesFromChat = (chatId: string) => {
  return getRefOnChatMessages(chatId)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
}

export const addNotificationMessageInDB = (conversationId: string, text: string) => {
  const message: MessageEntity = {
    id: shortid.generate(),
    text,
    createdAt: new Date(Date.now()),
    isNotification: true,
  };
  socket.emit(SocketEvents.SendMessage, conversationId, message, true);
};
