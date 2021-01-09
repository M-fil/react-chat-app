import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as UserServices from '../../services/users';
import * as PrivateChatServices from '../../services/private-chats';
import { selectUserChats, selectUserUid } from '../../selectors/auth';
import { selectPrivateChatsWithCurrentUser, PrivateChatWithCurrentUserEntity } from '../../selectors/chats';
import { updateCurrentUserPrivateChats } from '../../redux/actions/chat';
import { updateUserPrivateChatsIdsAction } from '../../redux/actions/auth';

interface UsePrivateChatChangeReturnedValue {
  privateChats: PrivateChatWithCurrentUserEntity[],
}

export const usePrivateChatsChange = (): UsePrivateChatChangeReturnedValue => {
  const dispatch = useDispatch();
  const currentUserChats = useSelector(selectUserChats);
  const currentUserUid = useSelector(selectUserUid);
  const privateChatsWithCurrentUser = useSelector(selectPrivateChatsWithCurrentUser);

  useEffect(() => {
    const getChat = PrivateChatServices.getLinkOnPrivateChatInDB('');
    getChat
      .on('value', (snapshot) => {
        const data = snapshot.val();
        let filteredChats = (currentUserChats || []).map((chatId) => data[chatId]).filter((chat) => chat);
        dispatch(updateCurrentUserPrivateChats(filteredChats));
      });

    return () => {
      getChat.off('value');
    };
  }, [dispatch, currentUserChats]);

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
