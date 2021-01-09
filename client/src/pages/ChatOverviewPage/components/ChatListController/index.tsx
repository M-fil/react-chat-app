import React, { useCallback, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { UserEntity } from '../../../../core/interfaces/user';
import { ChatType } from '../../../../core/interfaces/chat';
import CreateChatModal from '../Modals/CreateChatModal';

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
    <header>
      <CreateChatModal
        isVisible={isCreateModalVisible}
        setIsVisible={setIsCreateModalVisible}
        users={users}
        type={createChatType}
      />
      <Button
        onClick={onOpenCreateChatModal('private-chat')}
        htmlType="button"
      >
        Create new chat
      </Button>
      <Button
        onClick={onOpenCreateChatModal('conversation')}
        htmlType="button"
      >
        Create new conversation
      </Button>

      <div className="list-items-buttons">
        <Checkbox
          onChange={onSelectChatsTypeHandler('private-chat')}
          checked={visibleChatsType.includes('private-chat')}
        >
          Private Chats
        </Checkbox>
        <Checkbox
          onChange={onSelectChatsTypeHandler('conversation')}
          checked={visibleChatsType.includes('conversation')}
        >
          Conversations
        </Checkbox>
      </div>
    </header>
  );
};

export default ChatListController;
