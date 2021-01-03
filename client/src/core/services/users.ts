import { firebaseServices } from '../firebase';
import { DBCollections } from '../constants/db';
import { UserEntity } from '../redux/reducers/auth';

export const createNewUserInDB = (user: UserEntity) => {
  if (user.uid) {
    firebaseServices.db
      .collection(DBCollections.Users)
      .doc(user.uid)
      .set(user);

    firebaseServices.rdb
      .ref(`${DBCollections.Users}/${user.uid}`)
      .set(user)
  }
}

export const getAllUsersFromDB = () => {
  return firebaseServices.rdb
    .ref(DBCollections.Users)
    .get()
    .then((snapshot) => {
      const values = snapshot.val();
      return values;
    });
}

export const getLinkOnUserByUid = (uid: string) => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Users}/${uid}`);
}

export const getUserFromDBByUid = (uid: string): Promise<UserEntity> => {
  return firebaseServices.rdb
    .ref(`${DBCollections.Users}/${uid}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      return data;
    });
}
