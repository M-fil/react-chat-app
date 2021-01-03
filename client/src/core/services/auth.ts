import { firebaseServices } from '../firebase';

export const registerUser = (email: string, password: string) => {
  return firebaseServices.auth.createUserWithEmailAndPassword(email, password)
};

export const loginUser = (email: string, password: string) => {
  return firebaseServices.auth.signInWithEmailAndPassword(email, password);
}

export const logOutUser = async () => {
  return firebaseServices.auth.signOut();
}
