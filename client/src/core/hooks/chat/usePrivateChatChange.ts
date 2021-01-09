import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as UserServices from '../../services/users';
import * as PrivateChatServices from '../../services/private-chats';
import { selectUserChatsIds, selectUserUid } from '../../selectors/auth';
import { selectPrivateChatsWithCurrentUser, PrivateChatWithCurrentUserEntity } from '../../selectors/chats';
import { updateCurrentUserPrivateChats } from '../../redux/actions/chat';
import { updateUserPrivateChatsIdsAction } from '../../redux/actions/auth';
import { PrivateChatEntity } from '../../interfaces/chat';

interface UsePrivateChatChangeReturnedValue {
  privateChats: PrivateChatWithCurrentUserEntity[],
}

export const usePrivateChatsChange = (): UsePrivateChatChangeReturnedValue => {
  const dispatch = useDispatch();
  const currentUserChatsIds = useSelector(selectUserChatsIds);
  const currentUserUid = useSelector(selectUserUid);
  const privateChatsWithCurrentUser = useSelector(selectPrivateChatsWithCurrentUser);

  useEffect(() => {
    const getChats = PrivateChatServices.getLinkOnPrivateChatInDB('');
    getChats
      .on('value', (snapshot) => {
        const data = snapshot.val();
        const result: PrivateChatEntity[] = [];
        currentUserChatsIds.forEach((id) => {
          const value = data && data[id];
          if (value && id) {
            result.push(value);
          }
        });
        dispatch(updateCurrentUserPrivateChats(result));
      });

    return () => {
      getChats.off('value');
    };
  }, [dispatch, currentUserChatsIds]);

  useEffect(() => {
    const getLinkOnUser = UserServices.getLinkOnUserByUid(currentUserUid);
    getLinkOnUser
      .on('value', (snapshot) => {
        const data = snapshot.val();
        dispatch(updateUserPrivateChatsIdsAction((data.chats || [])));
      });

    return () => {
      getLinkOnUser.off('value');
    }
  }, [currentUserUid, dispatch]);

  return {
    privateChats: privateChatsWithCurrentUser,
  };
};
