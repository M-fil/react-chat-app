import React, { useCallback, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { UserEntity } from '../../../../core/interfaces/user';
import { ChatType } from '../../../../core/interfaces/chat';
import CreateChatModal from '../Modals/CreateChatModal';
import { DefaultButton } from '../../../../core/styles/components/Buttons';
import { DefaultCheckbox } from '../../../../core/styles/components/Inputs';
import ChatNavBarContainer from './styled';

interface ChatListContainerProps {
  users: UserEntity[],
  onSelectChatsTypeHandler: (type: ChatType) => (event: CheckboxChangeEvent) => void,
  visibleChatsType: ChatType[],
}

const ChatListController: React.FC<ChatListContainerProps> = ({
  users, onSelectChatsTypeHandler, visibleChatsType,
}) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [createChatType, setCreateChatType] = useState<ChatType>('private-chat');

  const onOpenCreateChatModal = useCallback((type: ChatType) => () => {
    setCreateChatType(type);
    setIsCreateModalVisible(true);
  }, []);

  return (
    <ChatNavBarContainer>
      <CreateChatModal
        isVisible={isCreateModalVisible}
        setIsVisible={setIsCreateModalVisible}
        users={users}
        type={createChatType}
      />
      <div className="create-buttons">
        <DefaultButton
          onClick={onOpenCreateChatModal('private-chat')}
          type="button"
        >
          Create new chat
        </DefaultButton>
        <DefaultButton
          onClick={onOpenCreateChatModal('conversation')}
          type="button"
        >
          Create new conversation
        </DefaultButton>
      </div>
      <div className="chat-types-checkboxes">
        <DefaultCheckbox
          onChange={onSelectChatsTypeHandler('private-chat')}
          checked={visibleChatsType.includes('private-chat')}
        >
          Private Chats
        </DefaultCheckbox>
        <DefaultCheckbox
          onChange={onSelectChatsTypeHandler('conversation')}
          checked={visibleChatsType.includes('conversation')}
        >
          Conversations
        </DefaultCheckbox>
      </div>
    </ChatNavBarContainer>
  );
};

export default ChatListController;
