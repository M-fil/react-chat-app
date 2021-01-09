import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as ConversationServices from '../../services/conversation';
import * as UserServices from '../../services/users';
import { ConversationEntity } from '../../interfaces/conversation';
import { selectUserConversationIds, selectUserUid } from '../../selectors/auth';
import { selectConversations } from '../../selectors/chats';
import { updateCurrentUserConversationsAction } from '../../redux/actions/chat';
import { updateUserConversationIdsAction } from '../../redux/actions/auth';

interface UseConversationChangeReturnedValue {
  conversations: ConversationEntity[],
}

export const useConversationsChange = (): UseConversationChangeReturnedValue => {
  const dispatch = useDispatch();
  const userConversationIds = useSelector(selectUserConversationIds);
  const currentUserUid = useSelector(selectUserUid);
  const conversations = useSelector(selectConversations);

  useEffect(() => {
    const getConversation = ConversationServices.getLinkOnConversation([], '').link;
    getConversation
      .on('value', (snapshot) => {
        const data: { [prop: string]: ConversationEntity } = snapshot.val();
        const result: ConversationEntity[] = [];
        userConversationIds.forEach((id) => {
          const value = data && data[id];
          if (id && value) {
            result.push(value);
          }
        });
        dispatch(updateCurrentUserConversationsAction(result));
      });

    return () => {
      getConversation.off('value');
    };
  }, [dispatch, userConversationIds]);

  useEffect(() => {
    const getLinkOnUser = UserServices.getLinkOnUserByUid(currentUserUid);
    getLinkOnUser
      .on('value', (snapshot) => {
        const data = snapshot.val();
        dispatch(updateUserConversationIdsAction(data.conversations));
      });

    return () => {
      getLinkOnUser.off('value');
    }
  }, [currentUserUid, dispatch]);

  return {
    conversations,
  };
};
