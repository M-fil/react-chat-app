import React, { useCallback } from 'react';
import { message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { SearchUserOption } from '../../index';
import * as ChatServices from '../../../../../../core/services/chats';
import * as ConversationServices from '../../../../../../core/services/conversation';
import { selectChats, selectConversations } from '../../../../../../core/selectors/chats';
import { selectUserUid } from '../../../../../../core/selectors/auth';
import { updateCurrentUserChatsAction, updateCurrentUserConversationsAction } from '../../../../../../core/redux/actions/chat';
import { MessagesType } from '../../../../../../core/components/Chat/ChatMessages';
import { ConversationEntity } from '../../../../../../core/interfaces/conversation';

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
  const chats = useSelector(selectChats);
  const conversations = useSelector(selectConversations);
  const currentUserUid = useSelector(selectUserUid);
  const dispatch = useDispatch();

  const onHideModal = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const onConfirmDeletion = useCallback(() => {
    const targetChatToDelete = chats.find((chat) => chat.uid === targetIdToDelete);
    const targetConversationToDelete = conversations.find((conversation) => conversation.id === targetIdToDelete);

    if (targetChatToDelete) {
      const updatedChats = chats.filter((chat) => chat.uid === targetIdToDelete)
      const { email } = targetChatToDelete;
      ChatServices
        .updateChatsOfUser(currentUserUid, updatedChats)
        .then(() => {
          message.success(`The chat with ${email} was successfully deleted`);
          dispatch(updateCurrentUserChatsAction(updatedChats));
        })
        .catch(() => {
          message.error(`The error occurred while deleting the chat with ${email}`);
        })
        .finally(() => {
          setIsVisible(false);
        });
    } else if (targetConversationToDelete) {
      const updatesConversations = conversations.filter((conversation) => conversation.id !== targetIdToDelete);
      const { name } = targetConversationToDelete;
      ConversationServices.removeConversationFromDB(currentUserUid, targetIdToDelete)
        .then(() => {
          message.success(`Conversation '${name}' was deleted.`);
          dispatch(updateCurrentUserConversationsAction(updatesConversations));
        })
        .catch(() => {
          message.error(`The error occurred while deleting the '${name}' conversation`);
        })
        .finally(() => {
          setIsVisible(false);
        });
    }
  }, [setIsVisible, chats, conversations, currentUserUid, dispatch, targetIdToDelete]);

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
