import React, { useCallback } from 'react';
import { message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import * as ChatServices from '../../../../../core/services/chats';
import * as ConversationServices from '../../../../../core/services/conversation';
import { selectUserUid, selectUserChatsIds, selectUserConversationIds } from '../../../../../core/selectors/auth';
import { updateUserConversationIdsAction, updateUserPrivateChatsIdsAction } from '../../../../../core/redux/actions/auth';

interface DeleteModalProps {
  title?:string,
  targetIdToDelete: string,
  setIsVisible: Function,
  isVisible: boolean,
}

const defaultModalValues: {
  title: string,
  okText: string,
  cancelText: string,
} = {
  title: 'Are you sure that you want to delete the chat with?',
  okText: 'Delete',
  cancelText: 'Cancel',
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title, targetIdToDelete, setIsVisible, isVisible,
}) => {
  const userChatsIds = useSelector(selectUserChatsIds);
  const userConversationsIds = useSelector(selectUserConversationIds);
  const currentUserUid = useSelector(selectUserUid);
  const dispatch = useDispatch();

  const onHideModal = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const onConfirmDeletion = useCallback(() => {
    const targetConversationToDelete = userConversationsIds.find((id) => id === targetIdToDelete);
    const targetChatToDelete = userChatsIds.find((chatId) => chatId === targetIdToDelete);

    if (targetChatToDelete) {
      const updatedChats = userChatsIds.filter((chatId) => chatId !== targetIdToDelete)
      ChatServices
        .updateChatsOfUser(currentUserUid, updatedChats)
        .then(() => {
          message.success('The chat was successfully deleted');
          dispatch(updateUserPrivateChatsIdsAction(updatedChats));
        })
        .catch(() => {
          message.error('The error occurred while deleting the chat with');
        })
        .finally(() => {
          setIsVisible(false);
        });
    } else if (targetConversationToDelete) {
      const updatesConversations = userConversationsIds.filter((id) => id !== targetIdToDelete)
      const removeIndex = userConversationsIds.findIndex((id) => id === targetIdToDelete);
      ConversationServices.removeConversationFromDB(targetIdToDelete, currentUserUid, removeIndex)
        .then(() => {
          message.success('Conversation was deleted.');
          dispatch(updateUserConversationIdsAction(updatesConversations));
        })
        .catch(() => {
          message.error('The error occurred while deleting this conversation.');
        })
        .finally(() => {
          setIsVisible(false);
        });
    }
  }, [setIsVisible, userConversationsIds, currentUserUid, dispatch, targetIdToDelete, userChatsIds]);

  return (
    <Modal
      title={title || defaultModalValues.title}
      visible={isVisible}
      onOk={onConfirmDeletion}
      onCancel={onHideModal}
      okText={defaultModalValues.okText}
      cancelText={defaultModalValues.cancelText}
    />
  );
};

export default DeleteModal;
