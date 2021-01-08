import React, { useCallback, useState, useEffect } from 'react';
import { Modal, Avatar, Button, Tag } from 'antd';
import { useSelector } from 'react-redux';

import * as ConversationServices from '../../../../core/services/conversation';
import * as ChatServices from '../../../../core/services/chats';
import { InterlocutorEntity } from '../../../../core/interfaces/chat';
import { selectCurrentChatId } from '../../../../core/selectors/chats';
import { selectUserUid } from '../../../../core/selectors/auth';

interface UsersListModalProps {
  title?: string,
  isVisible: boolean,
  users: InterlocutorEntity[],
  onCancel?: () => void,
  withFooterButtons?: boolean,
}

const mockFunction = () => {};
const DEFAULT_MODAL_TITLE = 'Interlocutors of this conversation'

const UsersListModal: React.FC<UsersListModalProps> = ({
  isVisible, users, onCancel, withFooterButtons, title = DEFAULT_MODAL_TITLE,
}) => {
  const currentChatId = useSelector(selectCurrentChatId);
  const currentUserUid = useSelector(selectUserUid);
  const [interlocutors, setInterlocutors] = useState<InterlocutorEntity[]>(users);

  useEffect(() => {
    setInterlocutors(users);
  }, [users]);

  const onDeleteUserFromConversation = useCallback((event: React.MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    const deleteButtonElement = target.closest('[data-delete-interlocutor]') as HTMLButtonElement;

    if (deleteButtonElement) {
      const interlocutorId = deleteButtonElement.dataset.deleteInterlocutor;
      const newUsers = interlocutors.filter((user) => user.uid !== interlocutorId);
      const targetUser = interlocutors.find((user) => user.uid === interlocutorId);
      setInterlocutors(newUsers);
      ChatServices.addNotificationMessageInDB(
        currentChatId,
        `${targetUser?.email} was deleted from the chat`,
      );
      ConversationServices.updateInterlocutorsInConversation(currentChatId, newUsers)
    }
  }, [currentChatId, interlocutors]);

  return (
    <Modal
      visible={isVisible}
      onCancel={onCancel || mockFunction}
      footer={withFooterButtons}
      title={title}
    >
      <ul onClick={onDeleteUserFromConversation}>
        {interlocutors.map((interlocutor) => {
          const avatarText = interlocutor.email && interlocutor.email[0];
          const isAdmin = interlocutor.uid === currentUserUid;

          return (
            <div key={interlocutor.uid}>
              {isAdmin && (
                <Tag color="gold">You</Tag>
              )}
              <Avatar>
                {avatarText}
              </Avatar>
              <strong>
                {interlocutor.email}
              </strong>
              {!isAdmin && (
                <Button type="link" data-delete-interlocutor={interlocutor.uid}>
                  delete
                </Button>
              )}
            </div>
          );
        })}
      </ul>
    </Modal>
  );
};

export default UsersListModal;
