import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { firebaseServices } from '../firebase';
import { loginSuccessAction, logOutAction } from '../redux/actions/auth';
import { updateCurrentUserChatsAction } from '../redux/actions/chat';
import { UserEntity } from '../interfaces/user';
import * as UserServices from '../services/users';

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setIsReady(false);
    
    firebaseServices.auth.onAuthStateChanged((authUser) => {
      setIsAuthorized(!!authUser);
      if (authUser) {
        const uid = authUser?.uid || '';
        UserServices
          .getUserFromDBByUid(uid)
          .then((userFromDb) => {
            const authedUser: UserEntity = {
              email: authUser?.email || '',
              avatar: userFromDb.avatar,
              uid,
              chats: userFromDb.chats,
              conversations: userFromDb.conversations,
            }
            dispatch(updateCurrentUserChatsAction(userFromDb?.chats || []));
            dispatch(loginSuccessAction(authedUser));
            setIsLoading(false);
          })
      } else {
        dispatch(logOutAction());
        setIsLoading(false);
      }

      setIsReady(true);
    });
  }, [isAuthorized, setIsAuthorized, setIsLoading, dispatch]);

  return { isAuthorized, isLoading, isReady };
};

export { useAuth };
