import shortid from 'shortid';

import { DBCollections } from '../constants/db';
import { firebaseServices } from '../firebase';
import { MessageEntity, FromUserEntity } from '../interfaces/chat';
import { ConversationEntity } from '../interfaces/conversation';
import { socket } from '../../App';
import { SocketEvents } from '../constants/events';

export const getLinkOnConversation = (
  userId: string, extraPath: string[] = [], id: string = shortid.generate(),
) => {
  const dividedPath = extraPath.join('/');
  const link = firebaseServices.rdb
    .ref(`${DBCollections.Conversations}/${userId}/${id}/${dividedPath}`);
  
  return { link, id };
}

export const getConversationsOfCurrentUserById = (userId: string, conversationId: string) => {
  return getLinkOnConversation(userId, [], conversationId).link
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    })
}

export const createNewConversationInDB = (
  user: FromUserEntity, conversationName: string,
) => {
  const { link, id } = getLinkOnConversation(user.uid);
  const initialConversation: ConversationEntity = {
    id,
    name: conversationName,
    admin: user,
    messages: [],
  };
  socket.emit(SocketEvents.CreateConversation, id);

  return {
    callback: link.set(initialConversation),
    conversationId: id,
  };
}

export const addMessageToConversationFromDB = (
  conversationId: string, message: MessageEntity,
) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Messages}/${conversationId}`)
    .push(message)
};

export const getConversationsOfCurrentUser = (userId: string) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Conversations}/${userId}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
};

export const getMessagesOfConversation = (
  userId: string, conversationId: string,
) => {
  return getLinkOnConversation(userId, ['messages'], conversationId).link
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
}

export const removeConversationFromDB = (userId: string, conversationId: string) => {
  return getLinkOnConversation(userId, [], conversationId).link
    .remove();
};
