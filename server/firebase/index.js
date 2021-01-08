const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-chat-app-e40b1-default-rtdb.firebaseio.com/',
});

module.exports = {
  db: admin.database(),
}
