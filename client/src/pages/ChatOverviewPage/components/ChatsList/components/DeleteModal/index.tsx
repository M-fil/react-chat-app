import React, { useCallback } from 'react';
import { message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { SearchUserOption } from '../../index';
import * as ChatServices from '../../../../../../core/services/chats';
import { selectChats } from '../../../../../../core/selectors/chats';
import { selectUserUid } from '../../../../../../core/selectors/auth';
import { updateCurrentUserChatsAction } from '../../../../../../core/redux/actions/chat';

interface DeleteModalProps {
  title?:string,
  targetChat: SearchUserOption | null,
  setIsVisible: Function,
  isVisible: boolean,
}

const defaultModalValues: {
  getTitle: (email: string) => string,
  okText: string,
  cancelText: string,
} = {
  getTitle: (email: string) => `Are you sure that you want to delete the chat with ${email}?`,
  okText: 'Delete',
  cancelText: 'Cancel',
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title, targetChat, setIsVisible, isVisible,
}) => {
  const chats = useSelector(selectChats);
  const currentUserUid = useSelector(selectUserUid);
  const dispatch = useDispatch();

  const onHideModal = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const onConfirmDeletion = useCallback(() => {
    if (targetChat) {
      const updatedChats = chats.filter((chat) => chat.uid !== targetChat.uid);

      ChatServices
        .updateChatsOfUser(currentUserUid, updatedChats)
        .then(() => {
          message.success(`The chat with ${targetChat.email} was successfully deleted`);
          dispatch(updateCurrentUserChatsAction(updatedChats));
        })
        .catch(() => {
          message.error(`The error occurred while deleting the chat with ${targetChat.email}`);
        })
        .finally(() => {
          setIsVisible(false);
        });
    }
  }, [targetChat, setIsVisible, chats, currentUserUid, dispatch]);

  return (
    <Modal
      title={title || defaultModalValues.getTitle(targetChat?.email || '')}
      visible={isVisible}
      onOk={onConfirmDeletion}
      onCancel={onHideModal}
      okText={defaultModalValues.okText}
      cancelText={defaultModalValues.cancelText}
    />
  );
};

export default DeleteModal;
