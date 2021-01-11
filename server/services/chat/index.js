const { db } = require('../../firebase');
const DBCollections = require('../../constants/db-collections');

const createMessageInDB = (chatId, message) => {
  console.log('createMessageInDB', chatId)
  return db.ref(`${DBCollections.Messages}/${chatId}`).push(message);
};

const setLastMessageForChat = (chatId, type, lastMessage) => {
  const collection = type === 'private-chat'
    ? DBCollections.PrivateChats
    : DBCollections.Conversations;
    
  return db
    .ref(`${collection}/${chatId}/lastMessage`)
    .set(lastMessage);
}

module.exports = {
  createMessageInDB,
  setLastMessageForChat,
};
