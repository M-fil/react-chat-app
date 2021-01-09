import shortid from 'shortid';

import { DBCollections } from '../constants/db';
import { firebaseServices } from '../firebase';
import { InterlocutorEntity } from '../interfaces/chat';
import { ConversationEntity } from '../interfaces/conversation';
import { socket } from '../../App';
import { SocketEvents } from '../constants/events';
import { getLinkOnUserByUid } from './users';

export const getLinkOnConversation = (
  extraPath: string[] = [], id: string = shortid.generate(),
) => {
  const dividedPath = extraPath.join('/');
  const link = firebaseServices.rdb
    .ref(`${DBCollections.Conversations}/${id}/${dividedPath}`);
  
  return { link, id };
}

export const getConversationsOfCurrentUserById = (conversationId: string) => {
  return getLinkOnConversation([], conversationId).link
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    })
}

export const addConversationIdToUser = (
  userId: string, conversationId: string, numberOfConversations: number,
) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Users}/${userId}/conversations/${numberOfConversations}`)
    .set(conversationId);
}

export const createNewConversationInDB = (
  user: InterlocutorEntity, conversationName: string, numberOfConversations: number,
) => {
  const { link, id } = getLinkOnConversation();
  const initialConversation: ConversationEntity = {
    id,
    name: conversationName,
    admin: user,
    interlocutors: [user],
  };

  const callback = link.set(initialConversation)
    .then(() => {
      addConversationIdToUser(user.uid, id, numberOfConversations);
    });
  socket.emit(SocketEvents.CreateConversation, id);

  return {
    callback,
    conversationId: id,
  };
}

export const getConversationsOfCurrentUser = (userConversations: string[]) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Conversations}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      const result: { [prop: string]: ConversationEntity } = {};
      userConversations.forEach((conversationId) => {
        if (conversationId) {
          result[conversationId] = data[conversationId];
        }
      });

      return result;
    });
};

export const getMessagesOfConversation = (conversationId: string) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Messages}/${conversationId}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
}

export const removeConversationFromDB = (
  conversationId: string, userId: string, conversationIndex: number,
) => {
  return getLinkOnConversation([], conversationId).link
    .remove()
    .then(() => {
      getLinkOnUserByUid(userId, ['conversations', String(conversationIndex)]).remove();
    })
    .catch(() => {});
};

export const updateInterlocutorsInConversation = (
  conversationId: string, newInterlocutorIds: InterlocutorEntity[],
) => {
  return getLinkOnConversation(['interlocutors'], conversationId).link
    .set(newInterlocutorIds)
};
