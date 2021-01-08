const { db } = require('../../firebase');
const DBCollections = require('../../constants/db-collections');

const createMessageInDB = (chatId, message) => {
  console.log('createMessageInDB', chatId)
  return db.ref(`${DBCollections.Messages}/${chatId}`).push(message);
};

module.exports = {
  createMessageInDB,
};
